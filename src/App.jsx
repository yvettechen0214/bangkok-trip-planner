import { tripData } from './tripData'; // 導入您的旅遊數據
import React from 'react'; 
// 注意：LocationCard 組件保持不變，但請確認它是正確的版本（包含模態框功能）

// --- 組件: 地點卡片 (LocationCard) ---
// 保持這個組件不動，確保它在 App 組件之上
const LocationCard = ({ item }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`;

    return (
        <div className="relative h-full">
            <div 
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-400 cursor-pointer h-full flex flex-col justify-between"
                onClick={handleOpen}
            >
                <div>
                    // 修正後的標題和描述
                    <h4 className="text-xl font-semibold text-indigo-700 mb-1 line-clamp-1">{item.name}</h4>
                    <p className="text-gray-600 mb-2 text-sm italic line-clamp-2">{item.detail}</p>
                </div>
                <div className="text-xs space-y-1 mt-2 pt-2 border-t border-gray-100">
                    <p className="flex items-start">
                        <strong className="w-10 text-gray-500">📍 地址:</strong> 
                        <span className="text-gray-700 truncate">{item.address}</span>
                    </p>
                </div>
                <span className="text-xs mt-2 text-indigo-500 font-medium">點擊查看詳情...</span>
            </div>

            {isOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4"
                    onClick={handleClose}
                >
                    <div 
                        className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={handleClose}
                        >
                            ×
                        </button>
                        <h3 className="text-2xl font-bold text-indigo-700 mb-3 border-b pb-1">{item.name}</h3>
                        <p className="text-gray-600 mb-4 text-sm italic">{item.detail}</p>
                        <div className="space-y-3 text-sm">
                            <p className="flex items-start">
                                <strong className="w-20 text-gray-500">📍 地址:</strong> 
                                <a 
                                    href={mapsLink}
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
// --- LocationCard 組件結束 ---


// --- 主要應用程式組件 (App) ---
function App() {
    const { tripInfo, categories } = tripData; 
    
    // 🎯 新增狀態：追蹤當前選中的分類 ID
    const [selectedCategory, setSelectedCategory] = React.useState(categories[0].id);

    // 找到當前選中的分類物件
    const currentCategory = categories.find(cat => cat.id === selectedCategory);

    return (
        <div className="bg-gray-50 min-h-screen">
            
            {/* 頂部導航/標籤頁 (固定在最上方) */}
            <header className="fixed top-0 left-0 right-0 z-20 bg-white shadow-xl">
                {/* 標題與簡介 - 適合手機頂部 */}
                <div className="p-3 border-b border-indigo-100">
                    <h2 className="text-xl font-extrabold text-indigo-800 line-clamp-1">🇹🇭 曼谷行程助手</h2>
                    <p className="text-xs text-gray-500 mt-1">飯店：{tripInfo.hotel}</p>
                </div>

                {/* 分類選項卡 (Tabs) */}
                <nav className="flex overflow-x-auto whitespace-nowrap border-b border-indigo-200">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`
                                p-3 text-sm font-medium transition-colors border-b-2
                                ${selectedCategory === category.id
                                    ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50' // 選中樣式
                                    : 'text-gray-500 border-transparent hover:text-indigo-600' // 未選中樣式
                                }
                            `}
                        >
                            {category.name}
                        </button>
                    ))}
                </nav>
            </header>

            {/* 主要內容區 */}
            <main className="pt-[120px] p-4"> {/* pt-[110px] 確保內容在固定頂部導航下方 */}
                
                {/* 顯示當前選中的分類內容 */}
                {currentCategory && (
                    <section 
                        key={currentCategory.id} 
                        id={currentCategory.id} 
                        className="mb-10 pt-2 border-l-4 border-indigo-200 pl-4 bg-white p-4 rounded-lg shadow-md"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                            {currentCategory.name}
                        </h3>
                        <p className="text-gray-600 mb-6 text-sm">{currentCategory.description}</p>

                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2"> {/* 明確設定手機為單欄，平板以上兩欄 */}
                            {/* 渲染該分類下的所有地點卡片 */}
                            {currentCategory.items.map((item, index) => (
                                <LocationCard key={index} item={item} />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default App;