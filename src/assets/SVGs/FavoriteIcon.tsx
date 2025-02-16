/* import React, { useState } from 'react';

const FavoriteIcon: React.FC = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleIconClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      onClick={handleIconClick}
      className="w-10 h-10 cursor-pointer" // Size increased to w-10 h-10
      fill={isFavorited ? 'lightcoral' : 'none'}
      stroke="black"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M8.106,8.336c.558,.445,1.226,.668,1.894,.668s1.336-.223,1.893-.667c1.201-.957,3.107-3.198,3.107-5.137,0-1.765-1.346-3.2-3-3.2-.752,0-1.46,.311-2,.806-.54-.495-1.248-.806-2-.806-1.654,0-3,1.436-3,3.2,0,1.938,1.906,4.18,3.106,5.136Zm-.106-6.336c.554,0,1,.547,1,1,0,.553,.448,1,1,1s1-.447,1-1c0-.453,.446-1,1-1s1,.538,1,1.2c0,.972-1.242,2.688-2.354,3.573-.381,.303-.912,.304-1.293,0-1.111-.885-2.353-2.601-2.353-3.572,0-.662,.449-1.2,1-1.2Zm12,12h-.115c.029-.228,.075-.438,.098-.672,.085-.855-.194-1.709-.768-2.343-.565-.624-1.371-.982-2.212-.982l-14.006-.003c-.841,0-1.648,.358-2.213,.982C.21,11.616-.07,12.47,.015,13.325c.305,3.06,1.11,5.612,2.393,7.585,1.257,1.935,3.429,3.09,5.808,3.09h3.568c2.34,0,4.475-1.122,5.741-3h2.475c2.168,0,4-1.767,4-3.857,0-1.938-1.533-3.143-4-3.143Zm-8.216,8h-3.568c-1.699,0-3.244-.814-4.131-2.18-1.107-1.703-1.807-3.955-2.08-6.693-.03-.299,.063-.584,.261-.803,.189-.209,.449-.324,.73-.324l14.006,.003c.281,0,.541,.115,.729,.324,.198,.219,.291,.504,.261,.802-.273,2.738-.972,4.99-2.079,6.692-.888,1.364-2.432,2.179-4.131,2.179Zm8.216-3h-1.412c.395-.913,.711-1.917,.953-3h.459c1.327,0,2,.385,2,1.143,0,.989-.935,1.857-2,1.857Z"
      />
    </svg>
  );
}

export default FavoriteIcon;
 */

//test

import React, { useState, useEffect } from 'react';
import { checkIfFavorited, addFavorite, removeFavorite } from '../../utils/favoriteSBfunctions.ts';
import { supabase } from '../../utils/setupSupabase.ts';

const FavoriteIcon: React.FC<{ recipeId: string }> = ({ recipeId }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const isFav = await checkIfFavorited(recipeId);
      setIsFavorited(isFav);
    };
    fetchFavoriteStatus();
  }, [recipeId]);

  const handleIconClick = async () => {
    const {
      data: {user},
    error} = await supabase.auth.getUser();
    if(error) {
      console.error('Error getting user: ',error);
    return;
  }
    if(!user){
      console.error('User not logged in');
      return;
    }
    const userId = user.id;
    
    if (isFavorited) {
      await removeFavorite(recipeId, userId);
    } else {
      await addFavorite(recipeId, userId);
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      onClick={handleIconClick}
      className="w-10 h-10 cursor-pointer"
      fill={isFavorited ? 'lightcoral' : 'none'}
      stroke="black"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M8.106,8.336c.558,.445,1.226,.668,1.894,.668s1.336-.223,1.893-.667c1.201-.957,3.107-3.198,3.107-5.137,0-1.765-1.346-3.2-3-3.2-.752,0-1.46,.311-2,.806-.54-.495-1.248-.806-2-.806-1.654,0-3,1.436-3,3.2,0,1.938,1.906,4.18,3.106,5.136Zm-.106-6.336c.554,0,1,.547,1,1,0,.553,.448,1,1,1s1-.447,1-1c0-.453,.446-1,1-1s1,.538,1,1.2c0,.972-1.242,2.688-2.354,3.573-.381,.303-.912,.304-1.293,0-1.111-.885-2.353-2.601-2.353-3.572,0-.662,.449-1.2,1-1.2Zm12,12h-.115c.029-.228,.075-.438,.098-.672,.085-.855-.194-1.709-.768-2.343-.565-.624-1.371-.982-2.212-.982l-14.006-.003c-.841,0-1.648,.358-2.213,.982C.21,11.616-.07,12.47,.015,13.325c.305,3.06,1.11,5.612,2.393,7.585,1.257,1.935,3.429,3.09,5.808,3.09h3.568c2.34,0,4.475-1.122,5.741-3h2.475c2.168,0,4-1.767,4-3.857,0-1.938-1.533-3.143-4-3.143Zm-8.216,8h-3.568c-1.699,0-3.244-.814-4.131-2.18-1.107-1.703-1.807-3.955-2.08-6.693-.03-.299,.063-.584,.261-.803,.189-.209,.449-.324,.73-.324l14.006,.003c.281,0,.541,.115,.729,.324,.198,.219,.291,.504,.261,.802-.273,2.738-.972,4.99-2.079,6.692-.888,1.364-2.432,2.179-4.131,2.179Zm8.216-3h-1.412c.395-.913,.711-1.917,.953-3h.459c1.327,0,2,.385,2,1.143,0,.989-.935,1.857-2,1.857Z"
      />
    </svg>
  );
};

export default FavoriteIcon;
