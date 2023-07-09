import {
    FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { getData, ListItemType } from "./src/getData";
import { ListItem } from "./src/ListItem";

export default function App() {
  const data = getData();

  const renderItem = ({ item }: ListRenderItemInfo<ListItemType>) => {
    return <ListItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.title}${index}`}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

