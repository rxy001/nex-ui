Gitflow@v0.0.0

### Branches

- `dev` 分支. 功能开发.
- `main` 分支. 与已发布代码一致.

### PR 合并策略

使用 **Rebase** 保证线性历史.

### 功能开发
- 基于 `dev` 分支，创建 `feat/foo`.
- 完成后，向 `dev` 分支提交 PR.
- 检查 QA、Visual Tests 的 workflows 状态.

### 紧急修复
- 基于 `main` 分支，创建 `fix/boo`,
- 完成后，向 `main` 分支提交 PR.
- 检查 QA、Visual Tests 的 workflows 状态.

### 发布
- 本地 run changesets 后 push 到 `main` 分支，触发 Release workflow. 合并由 changesets 提交的 PR 后自动部署到 NPM.
- 自动 rebase origin/main 同步到 `dev` 分支.