import { useEffect, useRef, useState } from "react";
import { axios } from "../config/axios";
import { useAuthStore } from "../store/useAuthStore";
import user from "../assets/Screenshot 2569-02-17 at 13.10.54.png";

const ProfilePage = () => {
  const fileInputEl = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  console.log(image);

  const imageSrc = image ? URL.createObjectURL(image) : user;

  const handleClickImage = () => {
    fileInputEl.current?.click();
  };
  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (e.target.files) setImage(e.target.files[0]);
    // console.log(e.target.value);
    // console.log(e.target.files?.[0]);
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div
          className="size-60 rounded-full overflow-hidden"
          onClick={handleClickImage}
        >
          <img src={imageSrc} alt="" />
        </div>
        <input
          type="file"
          ref={fileInputEl}
          className="hidden"
          onChange={handleChangeImage}
          // multiple เลือกหลายรูปครับ
        />
      </div>
      {image && (
        <div className="flex justify-center items-center gap-3 mt-2">
          <button className="bg-green-400 p-1 font-bold text-white rounded-lg animate-pulse">
            Upload
          </button>
          <button
            className="bg-green-400 p-1 font-bold text-white rounded-lg animate-pulse"
            onClick={() => {
              setImage(null);
              if (fileInputEl.current){
                fileInputEl.current.value = ''; //ทำงานให้มีการเลือกรูปเดิมได้
              }
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;

// const ProfilePage = () => {
//   const accesstoken = useAuthStore((state) => state.accessToken);

//   useEffect(() => {
//     const fetchMe = async () => {
//       try {
//         const res = await axios.get("/auth/me");
//         // ,{headers: {Authorization: `Bearer ${accesstoken}`}})
//         console.log(res);
//       } catch (err) {
//         console.log('tessss', err)
//       }
//     };
//     if (accesstoken) fetchMe();
//   }, [accesstoken]);
//   return <div>ProfilePage</div>;
// };
// export default ProfilePage;
