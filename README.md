# dbt-osmosis-runner README

**dbt-osmosis-runner** is a Visual Studio Code extension that allows you to easily run the `dbt-osmosis yaml refactor` command on a selected folder.

## Features

- Right-click any folder in the Explorer view to run the command
- Automatically passes the selected folder name to the command
- Automatically searches for the directory containing `dbt_project.yml`, navigates to it, and runs the command from there

## Usage

1. Install the extension.

2. Open your dbt project in VS Code.

3. Right-click the target folder in the Explorer sidebar.

4. Select **“dbt-osmosis: Refactor YAML in this folder”** from the context menu.

5. The extension will automatically search for and navigate to the directory containing `dbt_project.yml`, then run the following commands:

   ```
   cd <path-to-dbt_project.yml>
   dbt-osmosis yaml refactor <folder_name>
   ```

## Requirements

- `dbt-osmosis` must be installed and available in your system PATH
- Your workspace must be a dbt project directory containing `dbt_project.yml`

## Note

If your `dbt_project.yml` is located at the workspace root, this automatic search and navigation are unnecessary.
 In that case, please modify the extension accordingly.

[Zenn](https://zenn.dev/yuichi_dev/articles/7a9a334ba96494)
