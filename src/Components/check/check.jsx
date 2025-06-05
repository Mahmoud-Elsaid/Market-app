

import React, { useRef, useState } from 'react'

export default function Check() {

    const [inputValue, setInputValue] = useState('');

  // التعامل مع التغييرات في الإدخال
  const handleChange = (event) => {
    setInputValue(event.target.value);  // تحديث الحالة
  };



  const inputRef = useRef(null);  // إنشاء ref للوصول إلى العنصر DOM

  // التعامل مع إرسال النموذج
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('قيمة الإدخال: ' + inputRef.current.value);  // الوصول إلى القيمة عبر ref
  };

  return (
    <>
    <div className=' my-5'>
      <input
        type="text"
        value={inputValue}          // قيمة الإدخال متحكم فيها بواسطة الحالة
        onChange={handleChange}     // تحديث الحالة عند تغير القيمة
      />
      <p>قيمة الإدخال: {inputValue}</p>
    </div>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputRef}  // ربط الـ ref مع حقل الإدخال
      />
      <button type="submit">إرسال</button>
    </form>

</>

  )
}
