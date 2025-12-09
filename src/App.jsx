import { tripData } from './tripData'; // 導入您的旅遊數據
import React, { useState } from 'react'; // 導入 React 狀態管理

// --- 組件: 側邊導航欄 ---
const Sidebar = ({ categories }) => {
    return (
        <aside className="w-64 fixed top-0 left-0 h-screen bg-indigo-600 p-4 text-white shadow-xl">
            <h1 className="text-2xl font-bold mb-6 border-b border-indigo-400 pb-2">🇹🇭 曼谷行程速覽</h1>
            <div className="mb-6 text-sm">
                <p>🗓️ {tripData.tripInfo.dates}</p>
                <p>🏨 {tripData.tripInfo.hotel}</p>
            </div>
            <nav className="space-y-2">
                {categories.map((category) => (
                    <a 
                        key={category.id} 
                        href={`#${category.id}`} 
                        // 使用 Tailwind 樣式實現互動性
                        className="block p-3 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        {category.name}
                    </a>
                ))}
            </nav>
        </aside>
    );
};

// --- 組件: 地點卡片 (LocationCard) ---
const LocationCard = ({ item }) => {
    // 引入 React 狀態 hook
    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div className="relative h-full">
            {/* 點擊觸發區塊 */}
            <div 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-400 cursor-pointer h-full flex flex-col justify-between"
                onClick={handleOpen}
            >
                <div>
                    <h4 className="text-xl font-semibold text-indigo-700 mb-2">{item.name}</h4>
                    <p className="text-gray-600 mb-3 text-sm italic line-clamp-2">{item.detail}</p>
                </div>
                
                {/* 預覽資訊 (只顯示地址) */}
                <div className="text-xs space-y-1 mt-4 pt-3 border-t border-gray-100">
                    <p className="flex items-start">
                        <strong className="w-12 text-gray-500">📍 地址:</strong> 
                        <span className="text-gray-700 truncate">{item.address}</span>
                    </p>
                </div>
                
                <span className="text-xs mt-2 text-indigo-500 font-medium">點擊查看詳情...</span>
            </div>

            {/* 浮現的模態框 (Modal) - 只有當 isOpen 為 true 時顯示 */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4"
                    onClick={handleClose} // 點擊背景關閉
                >
                    <div 
                        className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 relative transform transition-all scale-100"
                        onClick={(e) => e.stopPropagation()} // 阻止點擊模態框內部時關閉
                    >
                        {/* 關閉按鈕 */}
                        <button 
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={handleClose}
                        >
                            &times;
                        </button>
                        
                        {/* 詳細內容標題 */}
                        <h3 className="text-3xl font-bold text-indigo-700 mb-4 border-b pb-2">{item.name}</h3>
                        <p className="text-gray-600 mb-6 text-base italic">{item.detail}</p>
                        
                        {/* 詳細內容清單 */}
                        <div className="space-y-4 text-sm">
                            <p className="flex items-start">
                                <strong className="w-20 text-gray-500">📍 地址:</strong> 
                                <a 
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:text-blue-700 underline break-words"
                                >
                                    {item.address}
                                </a>
                            </p>
                            <p className="flex items-start">
                                <strong className="w-20 text-gray-500">📞 電話:</strong> {item.phone}
                            </p>
                            <p className="flex items-start">
                                <strong className="w-20 text-gray-500">🕒 營業時間:</strong> {item.hours}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


// --- 主要應用程式組件 ---
function App() {
    const { categories } = tripData; // 解構出分類數據

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* 側邊導航 */}
            <Sidebar categories={categories} />

            {/* 主要內容區 */}
            <main className="flex-1 ml-64 p-8 main-content">
                
                <header className="mb-10 p-6 bg-white rounded-lg shadow-xl sticky top-0 z-10">
                    <h2 className="text-4xl font-extrabold text-indigo-800">曼谷行程規劃助手</h2>
                    <p className="mt-2 text-lg text-gray-600">飯店：{tripData.tripInfo.hotel}</p>
                </header>

                {/* 根據 JSON 資料動態渲染每個分類區塊 */}
                {categories.map((category) => (
                    <section 
                        key={category.id} 
                        id={category.id} 
                        className="mb-16 pt-4 border-l-4 border-indigo-200 pl-4" // 左邊邊框增加視覺層次
                    >
                        <h3 className={`text-3xl font-bold text-gray-800 mb-6 border-b-4 border-indigo-500 pb-2`}>
                            {category.name}
                        </h3>
                        <p className="text-gray-600 mb-8">{category.description}</p>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* 渲染該分類下的所有地點卡片 */}
                            {category.items.map((item, index) => (
                                <LocationCard key={index} item={item} />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
}

export default App;