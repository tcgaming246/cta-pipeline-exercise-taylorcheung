import React from 'react';
import { Box } from '@mui/material';
import { KmxPencilFilled } from '@kmx/mui-icons';
import { Skill, SkillLevel } from '../../types/skill';

interface SkillCardProps {
  skill: Skill;
  isEditing: boolean;
  onEditClick: (skill: Skill) => void;
}

/**
 * SkillCard displays a single skill with its information
 * Shows an edit icon when not currently being edited
 */
const SkillCard: React.FC<SkillCardProps> = ({ skill, isEditing, onEditClick }) => {
  return (
    <article className={`${isEditing ? 'editing' : ''} skill-card`}>
      {/* Show editing overlay when this skill is being edited */}
      {isEditing && (
        <Box className="editing-overlay">
          <p>Editing...</p>
        </Box>
      )}
      
      {/* Skill name and edit button */}
      <span className="skill-header-container">
        <h1 className="skill-header detail">{skill.name}</h1>
        {!isEditing && (
          <KmxPencilFilled
            className="skill-edit-pencil"
            onClick={() => onEditClick(skill)}
          />
        )}
      </span>
      
      {/* Skill level */}
      <span className="skill-subheader">
        <p>Skill Level:</p>
        <p className="detail">{SkillLevel[skill.skillLevel]}</p>
      </span>
      
      {/* Skill description */}
      <p>{skill.description}</p>
    </article>
  );
};

export default SkillCard;
