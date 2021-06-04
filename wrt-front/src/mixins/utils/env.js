export default function getEnvVar(name) {
    if (
      typeof window !== "undefined" &&
      "configs" in window &&
      name in window.configs
    ) {
      return window.configs[name];
    }
    return process.env[name];
}