import { tripData } from './tripData'; // 導入您的旅遊數據
import React from 'react'; 
// 注意：LocationCard 組件保持不變，但請確認它是正確的版本（包含模態框功能）

// --- 組件: 地點卡片 (LocationCard) ---
const LocationCard = ({ item }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    // 🎯 修正點 1：定義 Google Maps 連結 (只用於地址查詢)
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`;

    // 🎯 修正點 2：檢查是否為 Klook 連結
    const klookUrl = "https://www.klook.com/zh-TW/experiences/list/bangkok-massages-hot-springs/c4-cate20/";
    const isKlookLink = item.address === klookUrl;

    return (
        <div className="relative h-full">
            
            {/* 點擊觸發區塊 - 點擊固定開啟模態框 */}
            <div 
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-400 cursor-pointer h-full flex flex-col justify-between"
                onClick={handleOpen} // 點擊卡片固定開啟模態框
            >
                <div>
                    <h4 className="text-xl font-semibold text-indigo-700 mb-1 line-clamp-1">{item.name}</h4>
                    <p className="text-gray-600 mb-2 text-sm italic line-clamp-2">{item.detail}</p>
                </div>
                
                {/* 預覽資訊 (只顯示地址/連結) */}
                <div className="text-xs space-y-1 mt-2 pt-2 border-t border-gray-100">
                    <p className="flex items-start">
                        <strong className="w-10 text-gray-500">
                            {isKlookLink ? '🔗 連結:' : '📍 地址:'}
                        </strong> 
                        <span className="text-gray-700 truncate">{item.address}</span>
                    </p>
                </div>
                
                <span className="text-xs mt-2 text-indigo-500 font-medium">點擊查看詳情...</span>
            </div>

            {/* 浮現的模態框 (Modal) */}
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
                        
                        {/* 🎯 修正點 3：模態框內容判斷 */}
                        {isKlookLink ? (
                            <div className="text-center mt-6">
                                <a 
                                    href={item.address} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block px-8 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 transition-colors text-lg"
                                    onClick={handleClose} // 點擊按鈕後關閉模態框
                                >
                                    點擊前往 Klook 預訂 (開啟 App)
                                </a>
                                <p className="text-gray-500 mt-3 text-sm">此連結將在新分頁中打開 Klook 網站，若您已安裝 App 則會自動跳轉。</p>
                            </div>
                        ) : (
                            /* 顯示一般地址、電話、時間 */
                            <div className="space-y-4 text-sm">
                                <p className="flex items-start">
                                    <strong className="min-w-[80px] shrink-0 text-gray-500">📍 地址:</strong> 
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
                                    <strong className="min-w-[80px] shrink-0 text-gray-500">📞 電話:</strong> {item.phone}
                                </p>
                                <p className="flex items-start">
                                    <strong className="min-w-[80px] shrink-0 text-gray-500">🕒 營業時間:</strong> {item.hours}
                                </p>
                            </div>
                        )}
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
                    <h2 className="text-xl font-extrabold text-indigo-800 line-clamp-1">Bangkok Trip</h2>
                    <p className="text-xs text-gray-500 mt-1">owner : yvette chen</p>
                    <p className="text-xs text-gray-500 mt-1">飯店：{tripInfo.hotel}</p>
                </div>

                {/* 分類選項卡 (Tabs) */}
                <nav className="flex overflow-x-auto whitespace-nowrap border-b border-indigo-200">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            // 🎯 修正點：使用一個函式來處理點擊事件
                            onClick={() => {
                                // 1. 設定選中的分類
                                setSelectedCategory(category.id);
                                // 2. 將網頁捲動到最頂端
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth' // 使用平滑捲動效果
                                });
                            }}
                            className={`
                                p-3 text-sm font-medium transition-colors border-b-2
                                ${selectedCategory === category.id
                                    ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50'
                                    : 'text-gray-500 border-transparent hover:text-indigo-600'
                                }
                            `}
                        >
                            {category.name}
                        </button>
                    ))}
                </nav>
            </header>

            {/* 主要內容區 */}
            <main className="pt-[140px] p-4"> {/* pt-[110px] 確保內容在固定頂部導航下方 */}
                
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

                        <div className="grid gap-6 grid-cols-1"> {/* 確保所有尺寸都是單欄顯示，解決寬度溢出 */}
                             {/* 渲染該分類下的所有地點卡片 */}
                            {currentCategory.items.map((item, index) => (
                                    <LocationCard key={index} item={item} />
                            ))}
                        </div>
                            {/* 渲染該分類下的所有地點卡片 */}
                            {currentCategory.items.map((item, index) => (
                                <LocationCard key={index} item={item} />
                            ))}
                
                    </section>
                )}
            </main>
        </div>
    );
}

export default App;