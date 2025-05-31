import { useEffect, useRef, useState } from "react";
import { Button } from "../Ui/button";
import { Input } from "../Ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Ui/card";
import { Label } from "../Ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../Ui/avatar";
import { UserSettings } from "../../services/UserSettings";
import { IProfile } from "../../Lib/interfaces/models/IProfile";
import placeholder from "../../assets/images/users.png";
const userSettings = new UserSettings();

export function ProfileSection() {
  const [profile, setProfile] = useState<IProfile>({
    name: "",
    email: "",
    bio: "",
    avatarUrl: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userSettings.getProfile().then((profile: IProfile) => {
      if (profile) {
        setProfile(profile);
        setAvatarPreview(profile.avatarUrl || null);
      }
    });
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && userSettings.isAvatarValid(file)) {
      setAvatarFile(file);
      const preview = await userSettings.getAvatarPreview(file);
      setAvatarPreview(preview);
    } else {
      alert("Invalid avatar file");
    }
  };

  const handleSave = async () => {
    const result = await userSettings.updateProfile({ ...profile, avatarFile });
    if (result.success) {
      alert("Profile updated!");
    } else {
      alert(result.error || "Failed to update profile");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile details and public information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarPreview || placeholder} />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Avatar
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                placeholder="Tell us about yourself"
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
              />
            </div>
          </div>

          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage your connected social accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="font-medium">GitHub</div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="font-medium">Google</div>
            </div>
            <Button variant="outline">Connect</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
