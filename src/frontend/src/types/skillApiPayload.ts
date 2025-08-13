import { Skill } from 'types/skill'
export type SkillApiPayload = Omit<Skill, 'skillLevel'> & { skillLevel: string };
