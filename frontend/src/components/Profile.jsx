import Navbar from "./Navbar";
import InputField from "./InputField";
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function Profile() {

    const [name, setName] = useState('');

    function onSubmitteed(e) {
        e.preventDefault();
    }

    function onSelected(e) {

    }

    function onCleared() {

    }

    function onChanged(e) {
        let value = e.target.value;
        let name = e.target.name;
        if (name === 'name') {
            setName(value);
        }   
    }

    return (
        <>
            <Navbar/>
            <div className="profile-grid">
                <form className="mx-5 mb-5" onSubmit={onSubmitteed}>
                    <h2 className="text-center">Setup Profile</h2>
                    <div className="form-inputs">
                        <div className="input-sections">
                            <div>
                                <InputField 
                                    name='name'
                                    type='text'
                                    placeholder='Name'
                                    value={name}
                                    onChanged={onChanged}
                                />
                                <Form.Select className='w-100 border p-2 mb-3 rounded' aria-label="Default select example" onChange={onSelected}>
                                    <option>Profile Type</option>
                                    <option value="1">Partner</option>
                                    <option value="2">Parent</option>
                                </Form.Select>
                                <Form.Select className='w-100 border p-2 mb-3 rounded' aria-label="Default select example" onChange={onSelected}>
                                    <option>Relationship Status</option>
                                    <option value="3">Single</option>
                                    <option value="4">Married</option>
                                </Form.Select>
                            </div>
                            <div>
                                <div class="form-group">
                                    <label for="profile-upload">
                                        <img src="./images/profile-picture.jpg" className="custom-picture" />
                                    </label>
                                    <input 
                                        type="file"
                                        name="profilePicture"
                                        label="Image"
                                        id="profile-upload"
                                        className="form-control custom-picture-upload"
                                        accept=".jpeg, .png, jpg"
                                    />
                                </div> 
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">About me</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="About me"></textarea>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <a className="btn btn-secondary mb-3 w-100" onClick={onCleared}>Create</a>
                        <a className="btn btn-outline-secondary w-100" href='/'>Clear all</a>
                    </div>
                </form>
                <div className="image-wrapper">
                    <img src="./images/image2.jpg" alt="" />
                </div>
            </div>
        </>
    );
}

export default Profile;