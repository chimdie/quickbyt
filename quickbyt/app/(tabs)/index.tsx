import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Search, CircleUserIcon} from 'lucide-react-native';
import {FlashList} from '@shopify/flash-list';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SafeAreaView} from '@/components/ui/SafeAreaView';
import {FoodCard} from '@/components/FoodCard';
import {CategoryItem} from '@/components/CategoryItem';
import {foods, categories} from '@/data/mockData';
import {Food, Category, CategoryT} from '@/types';
import {Colors} from '@/constants/Colors';
import {Link} from 'expo-router';
import {useAuthStore} from '@/store/useAuthStore';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryT | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [, setCart] = useState<{[key: string]: number}>({}); // cart
  const {user} = useAuthStore();
  // const {top, bottom} = useSafeAreaInsets();

  const filteredFoods = useMemo(() => {
    return foods.filter(food => {
      const matchesCategory = selectedCategory
        ? food.category === selectedCategory
        : true;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery.length === 0 ||
        food.name.toLowerCase().includes(query) ||
        food.description.toLowerCase().includes(query) ||
        food.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryName: CategoryT) => {
    setSelectedCategory(prev => (prev === categoryName ? null : categoryName));
  };

  const handleAddToCart = (foodId: string) => {
    setCart(prevCart => ({
      ...prevCart,
      [foodId]: (prevCart[foodId] || 0) + 1,
    }));
  };

  const renderCategoryItem = ({item}: {item: Category}) => (
    <CategoryItem
      id={item.id}
      name={item.name}
      image={item.image}
      selectedCategory={selectedCategory}
      onPress={() => handleCategorySelect(item.name)}
    />
  );

  const renderFoodItem = ({item}: {item: Food}) => (
    <FoodCard
      id={item.id}
      name={item.name}
      price={item.price}
      image={item.image}
      description={item.description}
      onAddToCart={handleAddToCart}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Good day, {user?.username || 'Foodie'}!
          </Text>
          <Text style={styles.subtitle}>What would you like to eat today?</Text>
        </View>
        <Link href="/(tabs)/profile" asChild>
          <TouchableOpacity style={styles.profileBtn}>
            <CircleUserIcon color={Colors.primary.main} />
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={{height: 100}}>
          <FlashList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            estimatedItemSize={20}
          />
        </View>
      </View>

      <View style={styles.foodsContainer}>
        <View style={styles.foodsHeader}>
          <Text style={styles.sectionTitle}>Popular Foods</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.foodListFlash]}>
          <FlashList
            data={filteredFoods}
            renderItem={renderFoodItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.grey[300],
  },
  subtitle: {
    fontSize: 16,
    color: Colors.grey[250],
    marginTop: 4,
  },
  profileBtn: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.grey[300],
  },
  categoriesContainer: {
    marginTop: 8,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.grey[300],
    marginBottom: 12,
  },
  categoriesList: {
    paddingVertical: 8,
  },
  foodsContainer: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 20,
    height: 'auto',
  },
  foodsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.main,
  },
  foodListFlash: {
    minHeight: 800,
    // paddingBottom: 200,
    marginBottom: 800,
  },
});
