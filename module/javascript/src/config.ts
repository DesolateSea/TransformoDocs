/**
 * Configuration management for NLP services.
 */

export interface ServiceSettings {
  [key: string]: any;
}

export interface ConfigFile {
  apiKey?: string;
  apiSecret?: string;
  settings?: ServiceSettings;
}

export class NLPServiceConfig {
  private apiKey: string | undefined;
  private apiSecret: string | undefined;
  private settings: ServiceSettings = {};

  constructor(apiKey?: string, apiSecret?: string) {
    this.apiKey = apiKey || process.env.NLP_SERVICE_API_KEY;
    this.apiSecret = apiSecret || process.env.NLP_SERVICE_API_SECRET;
  }

  /**
   * Load configuration from a JSON file
   * @param config Configuration object
   */
  public loadConfig(config: ConfigFile): void {
    if (config.apiKey) this.apiKey = config.apiKey;
    if (config.apiSecret) this.apiSecret = config.apiSecret;
    if (config.settings)
      this.settings = { ...this.settings, ...config.settings };
  }

  /**
   * Get the current configuration as a JSON object
   */
  public getConfig(): ConfigFile {
    return {
      apiKey: this.apiKey,
      apiSecret: this.apiSecret,
      settings: this.settings,
    };
  }

  /**
   * Update service settings
   * @param settings New settings to merge with existing ones
   */
  public updateSettings(settings: ServiceSettings): void {
    this.settings = { ...this.settings, ...settings };
  }

  /**
   * Check if the service is properly configured
   */
  public get isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiSecret);
  }

  /**
   * Get API key
   */
  public getApiKey(): string | undefined {
    return this.apiKey;
  }

  /**
   * Get API secret
   */
  public getApiSecret(): string | undefined {
    return this.apiSecret;
  }

  /**
   * Get specific setting value
   * @param key Setting key
   * @param defaultValue Default value if setting doesn't exist
   */
  public getSetting<T>(key: string, defaultValue?: T): T | undefined {
    return this.settings[key] ?? defaultValue;
  }
}
