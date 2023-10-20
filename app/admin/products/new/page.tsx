
'use client'
import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { Checkbox, Select } from 'antd';
import {useForm, FieldValues, Controller} from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import firebaseApp from '@/libs/firebase';
import { rejects } from 'assert';
import { error } from 'console';

const NewProductPage = () => {

  const { data: session } = useSession();
const route = useRouter()
  const {register, handleSubmit,setValue, getValues, control, formState:{errors}} = useForm<FieldValues>({
    defaultValues: {
      name:"",
      description:"", 
      brand:"", 
      category:"", 
      inStock: false, 
      images:[],
      price: ""
      

    }
  })

  const [selectedImages, setSelectedImages] = useState<any>([]);

  const handleImageChange = (e:any) => {
    const files = e.target.files;
    setSelectedImages([...selectedImages, ...files]);
    console.log('images', [...selectedImages, ...files])
    setValue('images',[...selectedImages, ...files]);
  };

  const categorys = [
    {
      value: '1',
      label: 'Not Identified',
    },
    {
      value: '2',
      label: 'Closed',
    },
    {
      value: '3',
      label: 'Communicated',
    },
    {
      value: '4',
      label: 'Identified',
    },
    {
      value: '5',
      label: 'Resolved',
    },
    {
      value: '6',
      label: 'Cancelled',
    },
  ]

  

  if( !session ||session?.user.role !== "ADMIN") {
      return (
        <div>you are not admin </div>
      )
  }
  return (
    <form onSubmit={handleSubmit( async(data) => {
  
       
        console.log('item', data);

        let uploadedImages:any[] = [];
        if(!data.category) {
          alert('ban chua chon category')
          return
        }
        if(!data.images || data.images.length ===0){
          alert('ban chua chon image')
          return

        }


        const handleImageUploads = async() => {
          // console.log(data.images[0]);
          // const fileName = new Date().getTime() + '-' + data.images[0].name
          // console.log('fileName', fileName);
         
          try {
            for(let item of data.images) {
              // console.log('item', item);
              if(item) {
                const fileName = new Date().getTime() + '-' + item.name
                // console.log('fileName', fileName);
                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, `products/${fileName}`)
                const uploadTask = uploadBytesResumable(storageRef, item)

                await new Promise<void>((resolve, rejects)=>{
                  uploadTask.on('state_changed', 
                  (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                      case 'paused':
                        console.log('Upload is paused');
                        break;
                      case 'running':
                        console.log('Upload is running');
                        break;
                    }
                  }, 
                  (error) => {
                    console.log('err upload image')
                    rejects(error)
                  }, 
                  
                  () => {
                    
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL
                      })
                        
                    
                      console.log('File available at', downloadURL);
                      resolve();
                    }).catch((error) => {
                      console.log("err getting the download url", error);
                      rejects(error);
                    })
                  }
                  )
                
                }
                )
              }
            }
          } catch (error) {
            console.log('err', error)
          }
          
      
        }
        await handleImageUploads();
        const productData = {...data,images: uploadedImages};
        console.log('product',productData);
       
   await  axios.post('/api/products', productData).then(() => {
          alert(" create product")
          route.push('/admin/products')
          route.refresh
        })
  
    })} className=" h-full  w-full  px-4">
            <div className="flex flex-col items-center justify-center">
                
                <div className="bg-white shadow rounded lg:w-2/3  md:w-1/2 w-full p-20 ">
                    <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">
                        Add Product
                    </p>
                   
                   
                    
              
                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400" />
                       
                    </div>
                   
                    <div className='mt-6  w-full'>
                        <label  className="text-sm font-medium leading-none text-gray-800">Name</label>
                        <input {...register('name')} aria-label="enter email adress" role="input" type="text" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                    </div>
                    <div className='mt-6  w-full'>
                        <label  className="text-sm font-medium leading-none text-gray-800">Price</label>
                        <input {...register('price')} aria-label="enter email adress" role="input" type="number" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                    </div>
                    <div className='mt-6  w-full'>
                        <label className="text-sm font-medium leading-none text-gray-800">Brand</label>
                        <input {...register('brand')} aria-label="enter email adress" role="input" type="text" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                    </div>
                    <div className='mt-6  w-full'>
                        <label className="text-sm font-medium leading-none text-gray-800">Description</label>
                        <textarea {...register('description')} aria-label="enter email adress" role="input" cols={60} rows={8} className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                    </div>
                    <div className='mt-6  w-full'>
                              <label className=''>
                  <Controller
                    name="inStock"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <input className='' type="checkbox" {...field} />
                    )}
                  />
                  Checkbox Label
      </label>
                    </div>
                  
                    <div className='mt-6  w-full flex flex-col space-y-6'>
                        <label className="text-sm font-medium leading-none text-gray-800">Select category</label>
                        <Controller
        name="category"
        control={control}
        defaultValue=""
        render={({ field }) => (
          
          <Select {...field}  size='large' placeholder='select category'>
          {
            categorys.map((category, index) =>{
              return <Select.Option  value={category.label} key={index}  >{category.label}</Select.Option>
            } )
          }
         </Select>
        )}
      />
                    </div>
                    {/* <div className='mt-6  w-full flex flex-col'>
                        <label className="text-sm font-medium leading-none text-gray-800">Select Image</label>
                        <input {...register('images')} aria-label="enter email adress" role="input" type="file" className="bg-gray-200 border rounded focus:outline-none mt-4 " />
                    </div> */}
                    <div>
      <h2>Select Multiple Images</h2>
      {/* <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      
      /> */}
            <Controller
        name="images"
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              field.onChange(e);
              handleImageChange(e);
            }}
          />
        )}
      />

      <div>
        {selectedImages.map((image, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>

  

    </div>
                    <div className="mt-8">
                        <button role="button" aria-label="create my account" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
                            LogIn
                        </button>
                    </div>
                </div>
            </div>
        </form>
  )
}

export default NewProductPage