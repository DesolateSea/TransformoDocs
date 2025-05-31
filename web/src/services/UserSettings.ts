import { ProfileSettingService } from "../scripts/user-settings/ProfileSettings";
import server from "../server.json";
export class UserSettings {
  private profileSettingService: ProfileSettingService;
  constructor() {
    this.profileSettingService = new ProfileSettingService(
      server.User.getUserInfo
    );
  }
  async getProfile(): Promise<any> {
    return await this.profileSettingService.getProfile();
  }
  async updateProfile(profile: any): Promise<any> {
    return await this.profileSettingService.updateProfile(profile);
  }
  async getAvatarPreview(file: File): Promise<string | null> {
    return await this.profileSettingService.getAvatarPreview(file);
  }
  isAvatarValid(file: File): boolean {
    return this.profileSettingService.isAvatarValid(file);
  }
}
