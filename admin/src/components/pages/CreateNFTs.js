import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import Sidebar from "../components/Sidebar";
import {
  createNft,
  createOrder,
  GetBrand,
  GetMyCollectionsList,
  getNFTList,
} from "../../apiServices";
import { useCookies } from "react-cookie";
import extendedERC721Abi from "./../../config/abis/extendedERC721.json";
import { exportInstance } from "../../apiServices";
import contracts from "./../../config/contracts";
import { getSignature } from "./../../helpers/getterFunctions";

function CreateNFTs() {
  const [nftImg, setNftImg] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState();
  const [brand, setBrand] = useState();
  const [currentUser, setCurrentUser] = useState();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [collections, setCollections] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nfts, setNfts] = useState([]);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      if (e.target.files && e.target.files[0]) {
        setNftImg(e.target.files[0]);
      }
    }
  };

  const handleValidationCheck = async () => {
    if (nftImg === "" || nftImg === undefined) {
      NotificationManager.error("Please Upload an Image", "", 800);
      return false;
    }
    if (title.trim() === "" || title === undefined) {
      NotificationManager.error("Please Enter a Title", "", 800);
      return false;
    }
    if (description.trim() === "" || description === undefined) {
      NotificationManager.error("Please Enter a Description", "", 800);
      return false;
    }
    if (collection === "" || collection === undefined) {
      NotificationManager.error("Please Choose a Collection", "", 800);
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (cookies.selected_account) setCurrentUser(cookies.selected_account);
    else NotificationManager.error("Connect Yout Wallet", "", 800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("current user is---->", currentUser, cookies.selected_account);
  }, [currentUser]);

  useEffect(() => {
    const fetch = async () => {
      let reqBody = {
        page: 1,
        limit: 12,
        nftID: "",
        collectionID: "",
        userID: "",
        categoryID: "",
        brandID: "",
        ERCType: "",
        searchText: "",
        filterString: "",
        isMinted: "",
      };
      let res = await getNFTList(reqBody);
      if (res && res.results.length > 0) {
        setNfts(res.results[0]);
        setTotalCount(res.count);
      }
      console.log("Ress", res);
    };
    fetch();
  }, []);

  const handleCreateNFT = async () => {
    if (handleValidationCheck()) {
      var fd = new FormData();

      fd.append("attributes", JSON.stringify([{ hello: "neha" }]));
      fd.append("levels", JSON.stringify([]));
      fd.append("creatorAddress", currentUser.toLowerCase());
      fd.append("name", title);
      fd.append("nftFile", nftImg);
      fd.append("quantity", 1);
      fd.append("collectionID", collection);
      fd.append("description", description);
      fd.append("tokenID", 1);
      fd.append("type", 1);
      fd.append("isMinted", 0);
      fd.append("imageSize", "0");
      fd.append("imageType", "0");
      fd.append("imageDimension", "0");
      let res = await createNft(fd);
      const NFTcontract = await exportInstance(
        "0x0886dec339f51604f67554c6aac7bd4eb2ebaf46",
        extendedERC721Abi.abi
      );
      let approval = await NFTcontract.isApprovedForAll(
        currentUser,
        contracts.MARKETPLACE
      );
      let approvalRes;
      let options = {
        from: currentUser,
        gasLimit: 9000000,
        value: 0,
      };
      if (!approval) {
        approvalRes = await NFTcontract.setApprovalForAll(
          contracts.MARKETPLACE,
          true,
          options
        );
        approvalRes = await approvalRes.wait();
        if (approvalRes.status === 0) {
          NotificationManager.error("Transaction failed", "", 800);
          return;
        }

        NotificationManager.success("Approved", "", 800);
      }

      let sellerOrder = [
        currentUser.toLowerCase(),
        "0x0886dec339f51604f67554c6aac7bd4eb2ebaf46",
        1,
        1,
        0,
        contracts.USDT,
        1,
        122334,
        [],
        [],
        123,
      ];
      let signature = await getSignature(currentUser, ...sellerOrder);
      let reqParams = {
        nftId: res.data._id,
        tokenAddress: contracts.USDT,
        collection: "0x7d69ea94f1b140560f7ff378ee750bcc1083fc95",
        price: 1,
        quantity: 1,
        saleType: 1,
        deadline: 122334,
        signature: signature,
        tokenId: 1,
        // auctionEndDate: _auctionEndDate,
        salt: 123,
      };

      let res1 = await createOrder(reqParams);
      console.log("NFTcontract", NFTcontract);
    }
  };

  useEffect(() => {
    setCurrentUser(cookies.selected_account);
  }, [cookies.selected_account]);

  useEffect(() => {
    const fetch = async () => {
      let reqBody = {
        page: 1,
        limit: 20,
      };
      let data = await GetMyCollectionsList(reqBody);
      if (data && data.results.length > 0) setCollections(data?.results[0]);
      setTotalCount(data?.count);
      // console.log("data", data);
    };
    fetch();
  }, []);

  return (
    <div className="wrapper">
      {/* <!-- Sidebar  --> */}
      <Sidebar />

      {/* <!-- Page Content  --> */}
      <div id="content">
        <div className="add_btn mb-4 d-flex justify-content-end">
          <button
            className="btn btn-admin text-light"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#NftModal"
          >
            + Add NFTs
          </button>
        </div>
        <div className="adminbody table-widget text-light box-background">
          <h5 className="admintitle font-600 font-24 text-yellow">NFTs</h5>
          <p className="admindescription">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <table class="table table-hover text-light">
            <thead>
              <tr>
                <th>NFT Image</th>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {console.log("nfts", nfts)}
              {nfts && nfts.length > 0
                ? nfts.map((n, i) => {
                    return (
                      <tr>
                        <td>
                          <img src={n.image} className="profile_i" alt="" />
                        </td>
                        <td>{n.name}</td>
                        <td>{n.description}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="modal fade"
        id="NftModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-yellow font-24 font-600"
                id="exampleModalLabel"
              >
                Create NFTs
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row">
                <div className="mb-1 col-md-4 offset-md-4">
                  <label for="recipient-name" className="col-form-label">
                    Upload Image *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={imageUploader}
                      style={{
                        display: "none",
                      }}
                    />
                    <div
                      className="update_btn"
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                      onClick={() => imageUploader.current.click()}
                    >
                      <p className="text-center">Click or Drop here</p>
                      <img
                        alt=""
                        ref={uploadedImage}
                        src={"../images/upload.png"}
                        style={{
                          width: "110px",
                          height: "110px",
                          margin: "auto",
                        }}
                        className="img-fluid profile_circle_img"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Title *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-md-12 mb-1">
                  <label for="message-text" className="col-form-label">
                    Description *
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Choose Collection *
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={collection}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setCollection(e.target.value);
                    }}
                  >
                    <option value="">Select</option>
                    {collections.length > 0
                      ? collections.map((c, i) => {
                          console.log("c", c._id);
                          return <option value={c._id}>{c.name}</option>;
                        })
                      : ""}
                  </select>
                </div>
                {/* <div className="col-md-6 mb-1">
                  <label for="recipient-name" className="col-form-label">
                    Brand *
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    {console.log("brands--", brands)}
                    {brands && brands.length > 0
                      ? brands.map((b, i) => {
                          return (
                            <option selected value="1">
                              {b.name}
                            </option>
                          );
                        })
                      : ""}
                  </select>
                </div> */}
              </form>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-admin text-light"
                onClick={handleCreateNFT}
              >
                Create NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNFTs;
