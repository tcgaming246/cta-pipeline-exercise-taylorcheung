import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Box } from '@mui/material';
import { Skill, SkillLevel } from '../../types/skill';
import './styles.css';

type SkillsFormProps = {
  handleCreateSkill: (skill: Skill) => void;
  handleDeleteSkill: () => void;
  handleEditSkill: (skill: Skill) => void;
  handleCancelEdit: () => void;
  skillBeingEdited: Skill | null;
};

/**
 * SkillsForm - A form component for creating and editing skills
 *
 * When skillBeingEdited is null: Shows "Add Skill" mode
 * When skillBeingEdited has a skill: Shows "Edit Skill" mode with Update/Delete/Cancel buttons
 */
export const SkillsForm: React.FC<SkillsFormProps> = ({
  handleCreateSkill,
  handleDeleteSkill,
  handleEditSkill,
  handleCancelEdit,
  skillBeingEdited,
}) => {
  // Form field state
  const [skillName, setSkillName] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState<SkillLevel>(
    SkillLevel.Basic
  );
  const [description, setDescription] = useState('');

  // Update form fields when skillBeingEdited changes
  useEffect(() => {
    if (skillBeingEdited) {
      // Edit mode: populate form with existing skill data
      setSkillName(skillBeingEdited.name);
      setProficiencyLevel(skillBeingEdited.skillLevel);
      setDescription(skillBeingEdited.description);
    } else {
      // Add mode: clear the form
      clearForm();
    }
  }, [skillBeingEdited]);

  /**
   * Handle creating a new skill
   */
  const handleAddClick = () => {
    handleCreateSkill({
      id: '', // API will generate the ID
      name: skillName,
      skillLevel: proficiencyLevel,
      description: description,
    });

    clearForm();
  };

  /**
   * Handle updating an existing skill
   */
  const handleUpdateClick = () => {
    if (!skillBeingEdited) return;

    handleEditSkill({
      id: skillBeingEdited.id,
      name: skillName,
      skillLevel: proficiencyLevel,
      description: description,
    });

    clearForm();
  };

  /**
   * Clear all form fields and reset to default values
   */
  const clearForm = () => {
    setSkillName('');
    setProficiencyLevel(SkillLevel.Basic);
    setDescription('');
  };

  return (
    <Paper elevation={3} className="skills-form-container">
      <Box component="form" className="skills-form">
        <TextField
          label="Skill Name"
          value={skillName}
          onChange={e => setSkillName(e.target.value)}
          required
          variant="outlined"
          size="small"
          className="skills-form-name-input"
        />

        <TextField
          select
          label="Proficiency Level"
          value={proficiencyLevel}
          onChange={e =>
            setProficiencyLevel(Number(e.target.value) as SkillLevel)
          }
          required
          variant="outlined"
          size="small"
          className="skills-form-level-select"
        >
          {Object.values(SkillLevel)
            .filter(value => typeof value === 'number')
            .map(level => (
              <option key={level} value={level}>
                {SkillLevel[level as SkillLevel]}
              </option>
            ))}
        </TextField>

        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          variant="outlined"
          size="small"
          multiline
          rows={1}
          className="skills-form-description-input"
        />

        {skillBeingEdited ? (
          <Box className="skills-form-actions">
            <Button
              type="button"
              variant="outlined"
              onClick={handleUpdateClick}
            >
              Update
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={handleDeleteSkill}
            >
              Delete
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </Box>
        ) : (
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="medium"
            className="skills-form-submit-button"
            onClick={handleAddClick}
          >
            Add Skill
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default SkillsForm;
