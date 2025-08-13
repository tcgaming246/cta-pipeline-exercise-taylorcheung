export type Skill = {
    id: string;
    name: string;
    description: string;
    skillLevel: SkillLevel
}

export enum SkillLevel {
    Basic = 1,
    Novice = 2,
    Intermediate = 3,
    Advanced = 4,
    Expert = 5
}