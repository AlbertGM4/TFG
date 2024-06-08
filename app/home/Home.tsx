// tejedor/app/home/Home.tsx

import HomeProjects from './components/HomeProjects';
import Categories from './components/HomeCategories';
import HomeFeatured from './components/HomeFeatured';
import HomeInfo from './components/HomeInfo';


const HomePage = () => {

    return (

        <div>

            <HomeProjects />

            <Categories />

            <HomeFeatured />

            <HomeInfo />

        </div>
    );
};

export default HomePage;
