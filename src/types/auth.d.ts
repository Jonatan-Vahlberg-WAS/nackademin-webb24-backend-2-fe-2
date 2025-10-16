type UserProfileRole ='student' | 'teacher' | 'admin';

type UserProfile = {
    user_id: string;
    full_name: string;
    avatar_url: string;
    bio: string;
    updated_at: string;
    role:  UserProfileRole
}