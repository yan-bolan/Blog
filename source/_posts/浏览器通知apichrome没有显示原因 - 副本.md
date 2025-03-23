#### Notifications API

对于 `type "basic"` 的 `notifications.create()`：

- **在 Firefox 中**：`iconUrl` 为可选项。
- **在 Chrome 中**：`iconUrl` 为必需项。

当用户点击通知时：

- **在 Firefox 中**：通知会立即清除。
- **在 Chrome 中**：情况并非如此（通知并不会立即清除）。

如果连续多次调用 `notifications.create()`：

- **在 Firefox 中**：通知可能不会显示。在 `notifications.create()` 回
