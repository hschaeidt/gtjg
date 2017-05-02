import * as OfflinePluginRuntime from "offline-plugin/runtime";

if (process.env.NODE_ENV === "production") {
  OfflinePluginRuntime.install({
    onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    onUpdated: () => location.reload(),
  });
}
