import { createElement } from "react";

// This file is a workaround to get vanilla JS working in a React application.
export const initializeVanillaJS = () => {
  // this call to setTimeout will execute the following JavaScript after a 100 millisecond delay, to give React time to render the HTML.
  // this is only necessary because we are building a site that can leverage both vanilla JS and React for building pages.
  // this file will not be used in the Reactify portion of the class but is essential for understanding how websites work under the hood
  // Your code will go inside the body of setTimeout, where the below comments are written to guide your code placement.
  setTimeout(() => {
    console.log('initializeVanillaJS')
    let addBtn = document.getElementById('add-btn');
   
    let skillLevel = document.getElementById('skillLevel');
    let skillDesc = document.getElementById('skillDesc');
    let skillName = document.getElementById('skillName');
    let skillList = document.getElementById('skill-list');
    let formElement = document.getElementById('skill-form');

    

    addBtn.addEventListener('click', handleAddSkill);

    

    function handleAddSkill(event){
      event.preventDefault();
      console.log(event.target);
      
      // //skill.textContent = "test";
      // document.getElementById('skill-list').appendChild(skill);

    const skillHeading = document.createElement('h3');
    const skillLevelP = document.createElement('p');
    const skillDescriptionP = document.createElement('p');
    let skill = document.createElement('li');

    skillHeading.textContent = skillName.value;
    skillLevelP.textContent = skillLevel.value;
    skillDescriptionP.textContent = skillDesc.value;

    const skillCard = document.createElement('article');
    skillCard.className='skill-card';

    skillCard.appendChild(skillHeading);
    skillCard.appendChild(skillLevelP);
    skillCard.appendChild(skillDescriptionP);

    skill.appendChild(skillCard);

    skillList.appendChild(skill);
    formElement.reset();
    }
   
    // Select HTML Elements

    // Primary Function

      // Get Form Values (Inside Primary Function)

      // Create new skill element (Inside Primary Function)

      // Add CSS classes (Inside Primary Function)

      // Assign form values (Inside Primary Function)

      // Build HTML (Inside Primary Function)

      // Clear form (Inside Primary Function)
    }, 100);

    // Wire up event listeners
}

