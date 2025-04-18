export const uploadImageToImgBB = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", image);
  const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error.message || "Failed to upload image");
  }

  return result.data.url; // Return the hosted image URL
};
