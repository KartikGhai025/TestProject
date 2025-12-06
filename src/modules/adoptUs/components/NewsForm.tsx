// "use client";

// import { useState } from "react";
// import { NewsService } from "../services/news.service";
// import { NewsData } from "../models/news.model"; // Import the data model

// // Define the initial state for the form, matching the NewsData type
// const initialState: NewsData = {
//   title: "",
//   content: "",
//   author: "",
//   authorId: "",
//   description: "",
//   category: "",
//   summary: "",
//   publicationDate: "",
// };

// export default function NewsForm() {
//   const [formData, setFormData] = useState<NewsData>(initialState);
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);

//     if (!formData.title || !formData.content || !formData.authorId) {
//       setMessage({ text: "Title, Content, and Author ID are required.", type: 'error' });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       await NewsService.create(formData);
//       setMessage({ text: "News created successfully!", type: 'success' });
//       setFormData(initialState);
//     } catch (error) {
//       console.error("Failed to create news:", error);
//       setMessage({ text: "Failed to create news. Please try again.", type: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Basic styles for the form elements
//   const formStyles: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', margin: 'auto' };
//   const labelStyles: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '5px', fontWeight: 'bold' };
//   const inputStyles: React.CSSProperties = { padding: '8px', border: '1px solid #ccc', borderRadius: '4px' };


//   return (
//     <form onSubmit={handleSubmit} style={formStyles}>
//       {/* Each input is now wrapped in a label */}
//       <label htmlFor="title" style={labelStyles}>
//         Title*
//         <input id="title" name="title" value={formData.title} onChange={handleChange} style={inputStyles} required />
//       </label>

//       <label htmlFor="content" style={labelStyles}>
//         Content*
//         <textarea id="content" name="content" value={formData.content} onChange={handleChange} style={inputStyles} required />
//       </label>

//       <label htmlFor="authorId" style={labelStyles}>
//         Author ID*
//         <input id="authorId" name="authorId" value={formData.authorId} onChange={handleChange} style={inputStyles} required />
//       </label>

//       <label htmlFor="description" style={labelStyles}>
//         Description
//         <input id="description" name="description" value={formData.description} onChange={handleChange} style={inputStyles} />
//       </label>

//       <label htmlFor="category" style={labelStyles}>
//         Category
//         <input id="category" name="category" value={formData.category} onChange={handleChange} style={inputStyles} />
//       </label>

//       <label htmlFor="summary" style={labelStyles}>
//         Summary
//         <input id="summary" name="summary" value={formData.summary} onChange={handleChange} style={inputStyles} />
//       </label>

//       <label htmlFor="publicationDate" style={labelStyles}>
//         Publication Date
//         <input id="publicationDate" name="publicationDate" type="date" value={formData.publicationDate} onChange={handleChange} style={inputStyles} />
//       </label>

//       <button type="submit" disabled={isLoading} style={{ padding: '10px', cursor: 'pointer' }}>
//         {isLoading ? "Creating..." : "Create News"}
//       </button>

//       {message && (
//         <p style={{ color: message.type === 'error' ? 'red' : 'green', textAlign: 'center' }}>
//           {message.text}
//         </p>
//       )}
//     </form>
//   );
// }