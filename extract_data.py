import pandas as pd
import json
import os

def generate_mock_data():
    file_path = 'intern_assignment_support_pack_dev_only_v3.xlsx'
    
    # Load all relevant sheets
    print("Loading Excel data...")
    devs = pd.read_excel(file_path, sheet_name='Dim_Developers')
    issues = pd.read_excel(file_path, sheet_name='Fact_Jira_Issues')
    prs = pd.read_excel(file_path, sheet_name='Fact_Pull_Requests')
    deployments = pd.read_excel(file_path, sheet_name='Fact_CI_Deployments')
    bugs = pd.read_excel(file_path, sheet_name='Fact_Bug_Reports')

    # We are focusing on one IC for the MVP journey
    target_dev_id = 'DEV-001'

    # 1. Profile Data
    profile = devs[devs['developer_id'] == target_dev_id].iloc[0]

    # 2. Cycle Time (Average time from In Progress to Done)
    dev_issues = issues[issues['developer_id'] == target_dev_id]
    cycle_time = dev_issues['cycle_time_days'].mean()

    # 3. PR Throughput (Count of merged PRs)
    dev_prs = prs[(prs['developer_id'] == target_dev_id) & (prs['status'] == 'merged')]
    pr_throughput = len(dev_prs)

    # 4. Lead Time & Deployment Frequency
    dev_deps = deployments[deployments['developer_id'] == target_dev_id]
    successful_deps = dev_deps[dev_deps['status'] == 'success']
    lead_time = successful_deps['lead_time_days'].mean()
    deployment_freq = len(successful_deps)

    # 5. Bug Rate (Escaped bugs / Completed issues)
    dev_bugs = bugs[(bugs['developer_id'] == target_dev_id) & (bugs['escaped_to_prod'] == 'Yes')]
    issues_completed = len(dev_issues[dev_issues['status'] == 'Done'])
    bug_rate = (len(dev_bugs) / issues_completed) * 100 if issues_completed > 0 else 0

    # Format the output JSON
    output = {
        "profile": {
            "id": str(profile['developer_id']),
            "name": str(profile['developer_name']),
            "role": str(profile['level']),
            "team": str(profile['team_name'])
        },
        "metrics": {
            "cycleTimeDays": round(cycle_time, 1) if pd.notnull(cycle_time) else 0,
            "prThroughput": int(pr_throughput),
            "leadTimeDays": round(lead_time, 1) if pd.notnull(lead_time) else 0,
            "deploymentFrequency": int(deployment_freq),
            "bugRatePercentage": round(bug_rate, 1)
        }
    }

    # Ensure the directory exists and write the file
    os.makedirs('mock-data', exist_ok=True)
    with open('mock-data/metrics.json', 'w') as f:
        json.dump(output, f, indent=2)
        
    print("Success! metrics.json has been generated in the mock-data folder.")

if __name__ == "__main__":
    generate_mock_data()