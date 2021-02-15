module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        config: 'conventional-changelog-gitmoji-config',
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        config: 'conventional-changelog-gitmoji-config',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# 更新日志',
      },
    ],
    '@semantic-release/npm', // 自动更新版本号,如果是 npm 模块则会触发发布流程
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'yarn pre-release',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: ['release'],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['.appcast.xml', 'CHANGELOG.md', 'package.json'],
        message:
          ':bookmark: chore(release): v${nextRelease.version} [skip ci]\n\nhttps://github.com/arvinxx/sketch-plugin-template/releases/tag/${nextRelease.gitTag}',
      },
    ],
  ],
};
