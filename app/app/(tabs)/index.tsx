import ProductCard from '@/components/ProductCard';
import {SafeAreaView, View} from 'react-native';
import {faker} from '@faker-js/faker';
import {FlatGrid} from 'react-native-super-grid';
import {SCREENPADDING} from '@/constants/sizes';
import {useState} from 'react';
// import QuickByteTab from '@/components/navigation/QuickByteTab';

export default function HomeScreen() {
  const [selectedTab, setSelectedIndex] = useState<number>(0);

  return (
    <SafeAreaView className="flex-1 justify-between dark:bg-black">
      <View className="flex-1">
        {/* <View className="mb-4" style={{paddingHorizontal: SCREENPADDING}}>
          <QuickByteTab
            selectedIndex={selectedTab}
            setSelectedIndex={setSelectedIndex}
            buttons={['Airtime ', 'Data ', 'Airtime ', 'Data ']}
          />
        </View> */}
        <FlatGrid
          itemDimension={160}
          data={products}
          renderItem={({item}) => <ProductCard product={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const categories = ['fruits', 'vegetables', 'grains', 'meat', 'seafood'];

const products = Array.from({length: 10}, () => ({
  _id: faker.string.uuid(),
  createdAt: faker.date.recent().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  description: faker.lorem.paragraph(),
  category: faker.helpers.arrayElement(categories),
  image: faker.image.urlPicsumPhotos(),
  isAvailable: faker.datatype.boolean(),
}));
