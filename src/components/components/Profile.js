import React from 'react';
import Web3 from "web3";
import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { updateProfile, getProfile } from "../../apiServices";
import { NotificationManager } from "react-notifications";

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
    
    
const [fname, setFname] = useState("");

  const [bio, setBio] = useState("");

  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [uname, setUname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [cookies] = useCookies(["selected_account"]);
  const [profile, setProfile] = useState();
  const [restrictSpace] = useState([" "])
  const [twitterHandle,setTwitterHandle]=useState("");
  const [instagramHandle,setInstagramHandle]=useState("")
  
  useEffect(() => {
      
    const fetch = async () => {
        console.log("in user profile api")
    
        let _profile = await getProfile();
        setProfile(_profile.data);
      
    };
    fetch();
  }, [currentUser]);

  
    
  //use Effect for setting Profile
  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      console.log("profile is---->",profile)
      let username = profile?.sUserName;
      
    
      setUname(username.trim());
    
      
      setWebsite(
        profile.sWebsite &&
          profile.sWebsite !== undefined &&
          profile.sWebsite !== "undefined"
          ? profile.sWebsite
          : ""
      );
      setBio(
        profile.sBio &&
          profile.sBio !== undefined &&
          profile.sBio !== "undefined"
          ? profile.sBio
          : ""
      );
     
      setEmail(
        profile.sEmail &&
          profile.sEmail !== undefined &&
          profile.sEmail !== "undefined"
          ? profile.sEmail
          : ""
      );
      setTwitterHandle(
        profile.twitterHandle &&
          profile.twitterHandle !== undefined &&
          profile.twitterHandle !== "undefined"
          ? profile.twitterHandle
          : ""
      );
      setInstagramHandle(
        profile.instagramHandle &&
          profile.instagramHandle !== undefined &&
          profile.instagramHandle !== "undefined"
          ? profile.instagramHandle
          : ""
      );
    }
  }, [profile]);
     
  
  //Update Profile 
  
  const handleUpdateProfile = async () => {
    let data = {
      uname: uname,
     
      bio: bio,
      website: website,
     
      profilePic: profilePic,
      email: email,
    };
    // if (profilePic === ""  profilePic === undefined) {
    //   NotificationManager.error("Please choose profile pic", "", 800);
    //   return;
    // }
   
  
    

   

    if (uname === "" && uname === undefined) {
      NotificationManager.error("Please choose valid username", "", 800);
      return;
    } else {
      if(uname.trim().length === 0)
      {
        NotificationManager.error("Space not allowed", "", 800);
        return;
      }
    }

    // if (email) {
    //   let res = await isValidEmail(email);
    //   if (!res) {
    //     return;
    //   }
    // }
    
   

    if (currentUser) {
      setLoading(true);
      try {
        let res = await updateProfile(currentUser, data);
        if (res === "User Details Updated successfully") {
          NotificationManager.success(res);
          setTimeout(() => {
            window.location.href = "/profile";
          }, 200);
        } else {
          NotificationManager.error(res);
        }
      } catch (e) {
        console.log("error", e);
        NotificationManager.error("Something Went Wrong");
      }

      setLoading(false);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProfilePic(img);
    }
  };
  
      useEffect(()=>{
          
      },[])
  return (
    <div className="profile_area pdd_8">
        <h1 className='profile_h1'>Profile Settings</h1>
        <div className="row">
            <div className="col-md-6">
            <form action="/action_page.php">
                <div class="mb-3 mt-3">
                    <label HTMLfor="user" class="form-label">Username</label>
                    <input type="text" class="form-control profile_input" id="user" placeholder="Digital Arms Dealer" name="user" onChange={(r) => {
                        setUname(r.target.value);
                      }} value={uname} />
                </div>
                <div class="mb-3 mt-3">
                    <label HTMLfor="comment" class="form-label">Bio</label>
                    <textarea class="form-control profile_textarea" 
                    rows="5" id="comment" name="comment"   
                    onChange={(r) => {
                        setBio(r.target.value);
                      }}>{bio?bio:"Enter Your Bio"}</textarea>
                </div>
                <div class="mb-3 mt-3">
                    <label for="email">Email Address</label>
                    <input type="email" class="form-control profile_input" id="email" placeholder="User_Account@email.com" 
                      onChange={(r) => {
                        setEmail(r.target.value);
                      }}
                    value={email} name="email" />
                </div>
                <div class="mb-3 mt-3">
                    <label for="links">Links</label>
                    <div className="add_links_input">
                        <input type="url" class="form-control" id="Twitter" name="Your Twitter Handle" 
                        placeholder='Your Twitter Handle' value={twitterHandle} onChange={(r) => {
                            setTwitterHandle(r.target.value);
                          }} style={ twiterImg } />
                        <input type="url" class="form-control" id="Instagram" 
                        name="You Instagram handle" placeholder='You Instagram handle' value={instagramHandle} onChange={(r) => {
                            setInstagramHandle(r.target.value);
                          }} style={ instaImg } />
                        <input type="url" class="form-control" id="address" name="Your Site address" 
                        placeholder='Your Site address' value={website} style={ AddressImg } />
                    </div>
                </div>
                <div class="mb-3 mt-3">
                    <label for="Wallet">Wallet Address</label>
                    <div className="copy_input">
                        <input type="text" value="0x0247842319CA3E517491cD28252097A7AD0d9De6" id="myInput" className="form-control profile_input" />
                        <button onclick="myFunction()">
                        <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 21V22.875C15 23.4963 14.4963 24 13.875 24H1.125C0.503672 24 0 23.4963 0 22.875V5.625C0 5.00367 0.503672 4.5 1.125 4.5H4.5V18.375C4.5 19.8225 5.67755 21 7.125 21H15ZM15 4.875V0H7.125C6.50367 0 6 0.503672 6 1.125V18.375C6 18.9963 6.50367 19.5 7.125 19.5H19.875C20.4963 19.5 21 18.9963 21 18.375V6H16.125C15.5063 6 15 5.49375 15 4.875ZM20.6705 3.42052L17.5795 0.329484C17.3685 0.11852 17.0824 1.55998e-06 16.784 0L16.5 0V4.5H21V4.21598C21 3.91763 20.8815 3.63149 20.6705 3.42052Z" fill="#485E6E"/>
                        </svg>
                        </button>
                    </div>
                </div>
                <div className='mt-5'>
                    <button type="submit" class="yellow_btn mr-3" onClick={() => {
                        handleUpdateProfile();
                      }}>Save</button>
                    {/*<button type="submit" class="yellow_btn yellow_dark">Save</button>*/}
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
                            <div className="overlat_btn">
                                <div className="upload-btn-wrapper img_edit_btn">
                                    <button class="btn"><i class="fa fa-edit fa-lg"></i></button>
                                    <input type="file" name="myfile" />
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
