export function setInitialData() {

    if(localStorage.getItem("favourite") === null) {
        const initialData = [
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/showbiz-4ddc408074338.jpg"
            ,albumName: "Showbiz"
            ,albumYear: "1999"
            ,artistName: "Muse"
            ,id: "2113382"
            ,rating: "5"},
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/qqtuuv1549017789.jpg"
            ,albumName: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?"
            ,albumYear: "2019"
            ,artistName: "Billie Eilish"
            ,id: "2313086"
            ,rating: "1"},
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/my-world-20-4ddc69dec685d.jpg"
            ,albumName: "My World 2.0"
            ,albumYear: "2010"
            ,artistName: "Justin Bieber"
            ,id: "2113854"
            ,rating: "1"},
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/hot-fuss-limited-edition-7-inch-box-set-4ddc38e3e1d71.jpg"
            ,albumName: "Hot Fuss"
            ,albumYear: "2004"
            ,artistName: "The Killers"
            ,id: "2177412"
            ,rating: "5"},
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/and-justice-for-all-504910cac4d19.jpg"
            ,albumName: "…and Justice for All"
            ,albumYear: "1988"
            ,artistName: "Metallica"
            ,id: "2126934"
            ,rating: "3"},            
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/im-with-you-4e5bea1661081.jpg"
            ,albumName: "I'm With You"
            ,albumYear: "2011"
            ,artistName: "Red Hot Chili Peppers"
            ,id: "2113066"
            ,rating: "2"},     
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/sruvxv1538736841.jpg"
            ,albumName: "Trench"
            ,albumYear: "2018"
            ,artistName: "Twenty One Pilots"
            ,id: "2307940"
            ,rating: "4"},          
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/definitely-maybe-4de93e4bbe5bc.jpg"
            ,albumName: "Definitely Maybe"
            ,albumYear: "1994"
            ,artistName: "Oasis"
            ,id: "2113121"
            ,rating: "4"},     
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/in-utero-4ddaf21540819.jpg"
            ,albumName: "In Utero"
            ,albumYear: "1993"
            ,artistName: "Nirvana"
            ,id: "2110840"
            ,rating: "5"},                 
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/born-to-die-4f2b7dccc6937.jpg"
            ,albumName: "Born to Die"
            ,albumYear: "2012"
            ,artistName: "Lana Del Rey"
            ,id: "2127594"
            ,rating: "5"},                       
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/one-x-4e82e606a75db.jpg"
            ,albumName: "One-X"
            ,albumYear: "2006"
            ,artistName: "Three Days Grace"
            ,id: "2122547"
            ,rating: "3"},
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/xttrtq1353879346.jpg"
            ,albumName: "Meteora"
            ,albumYear: "2003"
            ,artistName: "Linkin Park"
            ,id: "2111327"
            ,rating: "4"},    
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/sppvqp1526234936.jpg"
            ,albumName: "Tranquility Base Hotel + Casino"
            ,albumYear: "2018"
            ,artistName: "Arctic Monkeys"
            ,id: "2302022"
            ,rating: "2"},               
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/nightmare-4ddd79ca1dffe.jpg"
            ,albumName: "Nightmare"
            ,albumYear: "2010"
            ,artistName: "Avenged Sevenfold"
            ,id: "2116339"
            ,rating: "4"},                 
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/ghost-stories-5338d48badacf.jpg"
            ,albumName: "Ghost Stories"
            ,albumYear: "2014"
            ,artistName: "Coldplay"
            ,id: "2205903"
            ,rating: "5"},        
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/wptsuw1539549107.jpg"
            ,albumName: "A Head Full of Dreams"
            ,albumYear: "2015"
            ,artistName: "Coldplay"
            ,id: "2279758"
            ,rating: "3"},            
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/uyqssv1394034393.jpg"
            ,albumName: "The 2nd Law"
            ,albumYear: "2012"
            ,artistName: "Muse"
            ,id: "2124430"
            ,rating: "3"},            
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/qwpuxw1440604386.jpg"
            ,albumName: "Beauty Behind the Madness"
            ,albumYear: "2015"
            ,artistName: "The Weeknd"
            ,id: "2247627"
            ,rating: "3"},      
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/ryvqpu1507759333.jpg"
            ,albumName: "24K Magic"
            ,albumYear: "2016"
            ,artistName: "Bruno Mars"
            ,id: "2274043"
            ,rating: "2"},          
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/rwqxrv1356042437.jpg"
            ,albumName: "21st Century Breakdown"
            ,albumYear: "2009"
            ,artistName: "Green Day"
            ,id: "2112933"
            ,rating: "5"},          
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/ok-computer-4e23e3fb97822.jpg"
            ,albumName: "OK Computer"
            ,albumYear: "1997"
            ,artistName: "Radiohead"
            ,id: "2112023"
            ,rating: "4"},  
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/qwttxw1342003092.jpg"
            ,albumName: "Black Holes and Revelations"
            ,albumYear: "2006"
            ,artistName: "Muse"
            ,id: "2113383"
            ,rating: "4"},         
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/uptvrv1554295734.jpg"
            ,albumName: "Labrinth, Sia & Diplo present… LSD"
            ,albumYear: "2019"
            ,artistName: "LSD"
            ,id: "2317434"
            ,rating: "4"},    
            {albumImg: "https://www.theaudiodb.com/images/media/album/thumb/ssxuvx1486048950.jpg"
            ,albumName: "Starboy"
            ,albumYear: "2016"
            ,artistName: "The Weeknd"
            ,id: "2273822"
            ,rating: "4"}                                           
        ]
        localStorage.setItem("favourite", JSON.stringify(initialData))      
    }
}