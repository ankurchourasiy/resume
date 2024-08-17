import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ResumeTemplate from './ResumeTemplate';

function App() {
    const [formData, setFormData] = useState({
        image: '',
        profile: '',
        name: [''],
        phone: [''],
        email: [''],
        city: [''],
        skills: [],
        languages: [],
        education: [],
        experience: [],
        additionalFields: [],
    });

    const [resumeData, setResumeData] = useState(null);

    const handleChange = (index, e, fieldName) => {
        const { value } = e.target;
        if (fieldName === 'profile') {
            setFormData({
                ...formData,
                profile: value,
            });
        } else {
            const updatedArray = [...formData[fieldName]];
            updatedArray[index] = value;
            setFormData({
                ...formData,
                [fieldName]: updatedArray,
            });
        }
    };

    const addArrayField = (fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: [...formData[fieldName], ''],
        });
    };

    const removeArrayField = (index, fieldName) => {
        const updatedArray = formData[fieldName].filter((_, i) => i !== index);
        setFormData({
            ...formData,
            [fieldName]: updatedArray,
        });
    };

    const addEducationField = () => {
        setFormData({
            ...formData,
            education: [...formData.education, { college: '', course: '', from: '', to: '' }],
        });
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducation = [...formData.education];
        updatedEducation[index][name] = value;
        setFormData({
            ...formData,
            education: updatedEducation,
        });
    };

    const addExperienceField = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, { organization: '', designation: '', description: '', from: '', to: '' }],
        });
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperience = [...formData.experience];
        updatedExperience[index][name] = value;
        setFormData({
            ...formData,
            experience: updatedExperience,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/submit-resume', formData);
            setResumeData(response.data.data);
        } catch (error) {
            console.error('Error submitting resume:', error);
        }
    };

    const handleAddAdditionalField = () => {
        setFormData({
            ...formData,
            additionalFields: [...formData.additionalFields, { title: '', description: '' }]
        });
    };

    const handleAdditionalFieldChange = (index, e) => {
        const { name, value } = e.target;
        const updatedFields = [...formData.additionalFields];
        updatedFields[index][name] = value;
        setFormData({
            ...formData,
            additionalFields: updatedFields
        });
    };

    return (
        <div className="App">
            <h1>Resume Builder</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" onChange={(e) => handleChange(0, e, 'image')} />
                
                <div className="section">
                    <h2>Profile</h2>
                    <textarea
                        name="profile"
                        placeholder="Write a brief profile or objective statement"
                        value={formData.profile}
                        onChange={(e) => handleChange(0, e, 'profile')}
                    />
                </div>

                <div className="section">
                    <h2>Personal Information</h2>
                    {formData.name.map((nameField, index) => (
                        <div key={index} className="personal-info-entry">
                            <input
                                type="text"
                                name={`name-${index}`}
                                placeholder="Name"
                                value={nameField}
                                onChange={(e) => handleChange(index, e, 'name')}
                            />
                            <button type="button" onClick={() => removeArrayField(index, 'name')}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayField('name')}>Add Last Name</button>
                </div>

                <div className="section">
                    <h2>Contact Information</h2>
                    {formData.phone.map((phoneField, index) => (
                        <div key={index} className="contact-info-entry">
                            <input
                                type="text"
                                name={`phone-${index}`}
                                placeholder="Phone Number"
                                value={phoneField}
                                onChange={(e) => handleChange(index, e, 'phone')}
                            />
                            <button type="button" onClick={() => removeArrayField(index, 'phone')}>Remove</button>
                        </div>
                    ))}
                    {formData.email.map((emailField, index) => (
                        <div key={index} className="contact-info-entry">
                            <input
                                type="text"
                                name={`email-${index}`}
                                placeholder="Email"
                                value={emailField}
                                onChange={(e) => handleChange(index, e, 'email')}
                            />
                            <button type="button" onClick={() => removeArrayField(index, 'email')}>Remove</button>
                        </div>
                    ))}
                    {formData.city.map((cityField, index) => (
                        <div key={index} className="contact-info-entry">
                            <input
                                type="text"
                                name={`city-${index}`}
                                placeholder="City"
                                value={cityField}
                                onChange={(e) => handleChange(index, e, 'city')}
                            />
                            <button type="button" onClick={() => removeArrayField(index, 'city')}>Remove</button>
                        </div>
                    ))}
                </div>

                <div className="section">
                    <h2>Education</h2>
                    {formData.education.map((edu, index) => (
                        <div key={index} className="education-entry">
                            <input type="text" name="college" placeholder="College Name" value={edu.college} onChange={(e) => handleEducationChange(index, e)} />
                            <input type="text" name="course" placeholder="Course" value={edu.course} onChange={(e) => handleEducationChange(index, e)} />
                            <input type="text" name="from" placeholder="From" value={edu.from} onChange={(e) => handleEducationChange(index, e)} />
                            <input type="text" name="to" placeholder="To" value={edu.to} onChange={(e) => handleEducationChange(index, e)} />
                            <button type="button" onClick={() => removeArrayField(index, 'education')}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addEducationField}>Add More Education</button>
                </div>

                <div className="section">
                    <h2>Skills</h2>
                    {formData.skills.map((skill, index) => (
                        <div key={index} className="skill-entry">
                            <input type="text" value={skill} placeholder="Skill" onChange={(e) => handleChange(index, e, 'skills')} />
                            <button type="button" onClick={() => removeArrayField(index, 'skills')}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayField('skills')}>Add Skill</button>
                </div>

                <div className="section">
                    <h2>Languages</h2>
                    {formData.languages.map((language, index) => (
                        <div key={index} className="language-entry">
                            <input type="text" value={language} placeholder="Language" onChange={(e) => handleChange(index, e, 'languages')} />
                            <button type="button" onClick={() => removeArrayField(index, 'languages')}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayField('languages')}>Add Language</button>
                </div>

                <div className="section">
                    <h2>Experience</h2>
                    {formData.experience.map((exp, index) => (
                        <div key={index} className="experience-entry">
                            <input type="text" name="organization" placeholder="Organization" value={exp.organization} onChange={(e) => handleExperienceChange(index, e)} />
                            <input type="text" name="designation" placeholder="Designation" value={exp.designation} onChange={(e) => handleExperienceChange(index, e)} />
                            <textarea name="description" placeholder="Description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} />
                            <input type="text" name="from" placeholder="From" value={exp.from} onChange={(e) => handleExperienceChange(index, e)} />
                            <input type="text" name="to" placeholder="To" value={exp.to} onChange={(e) => handleExperienceChange(index, e)} />
                            <button type="button" onClick={() => removeArrayField(index, 'experience')}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addExperienceField}>Add More Experience</button>
                </div>

                <div className="section">
                    <h2>Additional Information</h2>
                    {formData.additionalFields.map((field, index) => (
                        <div key={index} className="additional-info-entry">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={field.title}
                                onChange={(e) => handleAdditionalFieldChange(index, e)}
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={field.description}
                                onChange={(e) => handleAdditionalFieldChange(index, e)}
                            />
                            <button type="button" onClick={() => removeArrayField(index, 'additionalFields')}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddAdditionalField}>Add More Information</button>
                </div>

                <button type="submit">Generate Resume</button>
            </form>

            {resumeData && <ResumeTemplate resumeData={resumeData} />}
        </div>
    );
}

export default App;
