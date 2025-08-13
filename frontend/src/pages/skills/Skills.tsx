import React, { useState, useEffect } from 'react';
import './styles.css';
import api from "../../api/service";
import { Skill } from '../../types/skill';
import { SkillLevel } from '../../types/skill';
import { SkillApiPayload } from 'types/skillApiPayload';


type SkillCardProps = {
  name: string;
  skillLevel: string;
  description: string;
  onDelete: () => void;
};

const SkillCard: React.FC<SkillCardProps> = ({ name, skillLevel, description, onDelete }) => (
  <article className="skill-card">
    <button className="delete-btn" onClick={onDelete}>×</button>
    <h2>{name}</h2>
    <p>Level: {skillLevel}</p>
    <p>{description}</p>
  </article>
);


type SkillFormProps = {
  onAddSkill: (skill: Skill) => void;
};

const SkillForm: React.FC<SkillFormProps> = ({ onAddSkill }) => {
  const [formData, setFormData] = useState<Skill>({
    id:'',
    name: '',
    skillLevel: SkillLevel.Novice,
    description: '',
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.skillLevel ||
      !formData.description.trim()
    ) {
      setError('All fields are required.');
      return;
    }

    const newSkill: Skill = {
      id: "",
      name: formData.name.trim(),
      skillLevel: formData.skillLevel,
      description: formData.description.trim(),
    };


    onAddSkill(newSkill);

    // Reset form
    setFormData({ id: '', name: '', skillLevel: SkillLevel.Novice, description: '' });
    setError('');
  };

  return (
    <form className="skill-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Skill Name"
        value={formData.name}
        onChange={handleChange}
        className="form-input"
      />
     <select
      value={formData.skillLevel}
      onChange={(e) =>
        setFormData({ ...formData, skillLevel: parseInt(e.target.value) })
      }
    >
      {Object.values(SkillLevel)
        .filter((v) => typeof v === 'number') // only enum numeric values
        .map((level) => (
          <option key={level} value={level}>
            {SkillLevel[level as unknown as keyof typeof SkillLevel]}
          </option>
    ))}
</select>
      <input
        type="text"
        name="description"
        placeholder="Skill Description"
        value={formData.description}
        onChange={handleChange}
        className="form-input"
      />
      <button type="submit" className="add-btn">Add Skill</button>
    </form>
  );
};

// Skills Component
const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([
  ]);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleAddSkill = async (newSkill: Skill) => {
  try {
    console.log("Payload being sent:", newSkill);
    await api.createSkill(newSkill);
    const updatedSkills = await api.getSkills();
    setSkills(updatedSkills);
    setShowSnackbar(true);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
      const fetchSkills = async () => {
        try {
          const skillsFromApi = await api.getSkills();
          setSkills(skillsFromApi);
        } catch (error) {
          console.error('Failed to fetch skills:', error);
        }
      };

      fetchSkills();
    }, []);

  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => setShowSnackbar(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar]);

  const handleDelete = async (skillId: string) => {
  try {
    await api.deleteSkill(skillId);  // call API to delete skill
    setSkills((prevSkills) => prevSkills.filter(skill => skill.id !== skillId)); // remove locally
  } catch (error) {
    console.error('Failed to delete skill:', error);
  }
};

  return (
    <div className="skills-container">
      <h1 className="skills-header">Skills Page</h1>

      <section id="add-skill">
        <h2>Add a Skill:</h2>
        <SkillForm onAddSkill={handleAddSkill} />
      </section>

      <section id="skills">
        {skills.map((skill, index) => (
          <SkillCard
            key={index}
            name={skill.name}
            skillLevel={SkillLevel[skill.skillLevel]} 
            description={skill.description}
            onDelete={() => handleDelete(skill.id)}
          />
        ))}
      </section>

      {showSnackbar && (
        <div className="snackbar">Skill added successfully!</div>
      )}
    </div>
  );
};

export default Skills;
