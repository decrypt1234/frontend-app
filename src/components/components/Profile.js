import React from 'react';

const twiterImg = {
    backgroundImage: "url(./img/profile/akar-icons_twitter-fill.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "18px",
    backgroundPosition: "10px center",
}
const instaImg = {
    backgroundImage: "url(./img/profile/bxl_instagram-alt.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "18px",
    backgroundPosition: "10px center",
}
const AddressImg = {
    backgroundImage: "url(./img/profile/ic_round-web.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "18px",
    backgroundPosition: "10px center",
}

function Profile() {

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
    
    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
            current.src = e.target.result;
        };
        reader.readAsDataURL(file);
        }
    };


  return (
    <div className="profile_area pdd_8">
        <h1 className='profile_h1'>Profile Settings</h1>
        <div className="row">
            <div className="col-md-6">
            <form action="/action_page.php">
                <div class="mb-3 mt-3">
                    <label HTMLfor="user" class="form-label">Username</label>
                    <input type="text" class="form-control profile_input" id="user" placeholder="Digital Arms Dealer" name="user" />
                </div>
                <div class="mb-3 mt-3">
                    <label HTMLfor="comment" class="form-label">Bio</label>
                    <textarea class="form-control profile_textarea" rows="5" id="comment" name="comment">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh porta amet leo nec. Mauris malesuada consectetur gravida est. </textarea>
                </div>
                <div class="mb-3 mt-3">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control profile_input" id="email" placeholder="User_Account@email.com" name="email" />
                </div>
                <div class="mb-3 mt-3">
                    <label for="links">Links</label>
                    <div className="add_links_input">
                        <input type="url" class="form-control" id="Twitter" name="Your Twitter Handle" placeholder='Your Twitter Handle' style={ twiterImg } />
                        <input type="url" class="form-control" id="Instagram" name="You Instagram handle" placeholder='You Instagram handle' style={ instaImg } />
                        <input type="url" class="form-control" id="address" name="Your Site address" placeholder='Your Site address' style={ AddressImg } />
                    </div>
                </div>
                <div class="mb-3 mt-3">
                    <label for="Wallet">Wallet Address</label>
                    <div className="copy_input">
                        <input type="text" value="Hello World" id="myInput" className="form-control profile_input" />
                        <button onclick="myFunction()">
                        <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 21V22.875C15 23.4963 14.4963 24 13.875 24H1.125C0.503672 24 0 23.4963 0 22.875V5.625C0 5.00367 0.503672 4.5 1.125 4.5H4.5V18.375C4.5 19.8225 5.67755 21 7.125 21H15ZM15 4.875V0H7.125C6.50367 0 6 0.503672 6 1.125V18.375C6 18.9963 6.50367 19.5 7.125 19.5H19.875C20.4963 19.5 21 18.9963 21 18.375V6H16.125C15.5063 6 15 5.49375 15 4.875ZM20.6705 3.42052L17.5795 0.329484C17.3685 0.11852 17.0824 1.55998e-06 16.784 0L16.5 0V4.5H21V4.21598C21 3.91763 20.8815 3.63149 20.6705 3.42052Z" fill="#485E6E"/>
                        </svg>
                        </button>
                    </div>
                </div>
                <div className='mt-5'>
                    <button type="submit" class="yellow_btn mr-3">Save</button>
                    <button type="submit" class="yellow_btn yellow_dark">Save</button>
                </div>
                <small className='small_info'>If no changes made the button will not glow</small>
            </form>
            </div>
            <div className="col-md-6">
                <ul className="profile_images">
                    <li>
                        <h4>Profile Image <img alt='' src={'../img/profile/mi_circle-information.png'} class="img-fluid" /></h4>
                        <div className="profile_image">
                            <img alt='' src={'../img/profile/profile1.png'} class="img-fluid profile_circle_img" />
                            <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div>
                        </div>
                    </li>
                    <li>
                        <h4>Profile Image <img alt='' src={'../img/profile/mi_circle-information.png'} class="img-fluid" /></h4>
                        <div className="profile_image">
                            <img alt='' src={'../img/profile/profile1.png'} class="img-fluid profile_circle_img" />
                            <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div>
                        </div>
                    </li>
                    <li>
                        <h4>Profile Image <img alt='' src={'../img/profile/mi_circle-information.png'} class="img-fluid" /></h4>
                        <div className="profile_image">
                            <img alt='' src={'../img/profile/profile2.png'} class="img-fluid profile_square_img" />
                            <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div>
                        </div>
                    </li>
                    <li>
                        <h4>Profile Image <img alt='' src={'../img/profile/mi_circle-information.png'} class="img-fluid" /></h4>
                        <div className="profile_image">
                            <img alt='' src={'../img/profile/profile2.png'} class="img-fluid profile_square_img" />
                            <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div>
                        </div>
                        <div className="profile_image">
                            {/* <img alt='' src={'../img/profile/profile1.png'} class="img-fluid profile_circle_img" /> */}
                            <div
                                style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                                }}
                            >
                                <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                ref={imageUploader}
                                style={{
                                    display: "none"
                                }}
                                />
                                <div className="profile_me"
                                    style={{
                                        height: "160px",
                                        width: "160px",
                                        position: "relative"
                                    }}
                                    onClick={() => imageUploader.current.click()}
                                >
                                    <img alt='' ref={uploadedImage} src={'../img/profile/profile1.png'} 
                                    style={{
                                    width: "100%",
                                    height: "100%",
                                    }}
                                    className="img-fluid profile_circle_img" />
                                    <div class="overlat_btn"><button type="" class="img_edit_btn"><i class="fa fa-edit fa-lg"></i></button></div>
                                </div>
                            </div>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Profile
