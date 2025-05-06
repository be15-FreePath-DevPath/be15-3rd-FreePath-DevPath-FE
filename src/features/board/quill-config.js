// import Quill from 'quill'
// import ImageUploader from 'quill-image-uploader'
//
// if (typeof window !== 'undefined' && !window.__quillImageUploaderRegistered) {
//     window.Quill = Quill
//     Quill.register('modules/imageUploader', ImageUploader)
//     window.__quillImageUploaderRegistered = true
// }
//
//
// export const modules = {
//     toolbar: [
//         ['bold', 'italic', 'underline'],
//         [{ header: 1 }, { header: 2 }],
//         [{ list: 'ordered' }, { list: 'bullet' }],
//         ['link', 'image']
//     ],
//     imageUploader: {
//         upload: async (file) => {
//             const formData = new FormData()
//             formData.append('file', file)
//             const res = await fetch('/api/upload', {
//                 method: 'POST',
//                 body: formData
//             })
//             const data = await res.json()
//             return data.url
//         }
//     }
// }
