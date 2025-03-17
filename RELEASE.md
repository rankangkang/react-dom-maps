# release

## npm package

每次打 tag 推送时，都会将 main 分支构建然后发布到 npm.

通过 `bumpp` 实现 bump version 以及打 tag。

```bash
pnpm bump
```

## storybook docs

storybook static 会被部署到 github pages 上，static 文件被托管在 gh_pages 分支。
部署同样集成到了 GithubActions 中，在以下情况触发构建：

- pr 到 main 分支
- push 到 main 分支
