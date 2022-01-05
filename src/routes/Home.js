import React, { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "../fbase";
import {
    collection,
    addDoc,
    query,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import Nweet from "../component/Nweet";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString } from "firebase/storage";
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();
    const fileInput = useRef();
    // const getNweets = async () => {
    //     const q = query(collection(dbService, "nweets"));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         const nweetObj = {
    //             ...doc.data(),
    //             id: doc.id,
    //         };
    //         console.log(doc);
    //         setNweets((prev) => [nweetObj, ...prev]);
    //     });
    // };
    useEffect(() => {
        // getNweets();
        const q = query(collection(dbService, "nweets"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newArray = querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setNweets(newArray);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);
        // await addDoc(collection(dbService, "nweets"), {
        //     text: nweet,
        //     createdAt: Date.now(),
        //     creatorId: userObj.uid,
        // });
        setNweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    const onClearAttachment = () => {
        setAttachment(null);
        fileInput.current.value = "";
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type={"text"}
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    ref={fileInput}
                />
                <input type={"submit"} value={"Nweet"} />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}> Clear</button>
                    </div>
                )}
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
