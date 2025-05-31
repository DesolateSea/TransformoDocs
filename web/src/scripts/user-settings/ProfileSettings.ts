import { APICallService } from "../Network/APICallService";
import { IPreviewHandler } from "../../Lib/interfaces/MLProcess/IPreviewHandler";
import { ImagePreviewHandler } from "../Preview/ImagePreviewHandler";
import { IProfile } from "../../Lib/interfaces/models/IProfile";

export class ProfileSettingService {
  private readonly endpoint: string;
  private readonly api: APICallService;
  private readonly previewHandler: IPreviewHandler;

  constructor(endpoint: string) {
    this.api = new APICallService();
    this.previewHandler = new ImagePreviewHandler();
    this.endpoint = endpoint;
  }
  async getProfile(): Promise<IProfile> {
    /**
     * TODO: Implement this
     */
    return {
      name: "Nishant Mohan",
      email: "nishant.mohan@gmail.com",
      bio: "this is my bio",
    };
    return await this.api.get<IProfile>(this.endpoint);
  }
  isAvatarValid(file: File): boolean {
    return this.previewHandler.canHandle(file);
  }
  async getAvatarPreview(file: File): Promise<string | null> {
    if (!this.isAvatarValid(file)) return null;
    return await this.previewHandler.generatePreview(file);
  }
  async updateProfile(profile: IProfile): Promise<IProfile> {
    const isUpdatingAvatar = !!profile.avatarFile;

    if (isUpdatingAvatar) {
      return this.updateWithAvatar(profile);
    }

    return this.updateWithoutAvatar(profile);
  }
  private async updateWithoutAvatar(profile: IProfile): Promise<IProfile> {
    const payload = {
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
      avatarUrl: profile.avatarUrl,
    };

    return await this.api.post(this.endpoint, payload);
  }
  private async updateWithAvatar(profile: IProfile): Promise<IProfile> {
    if (!this.isAvatarValid(profile.avatarFile!)) {
      throw new Error("Invalid avatar file");
    }

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("bio", profile.bio);
    formData.append("avatar", profile.avatarFile!);

    return await this.api.put(this.endpoint, formData);
  }
}
