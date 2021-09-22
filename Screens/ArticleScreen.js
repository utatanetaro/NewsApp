import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux'
import { addClip, deleteClip } from '../store/actions/user'
import 'react-native-gesture-handler';
import ClipButton from "../components/ClipButton";

const ArticleScreen = (props) =>{
  const { route } = props;
  const { article } = route.params;
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const { clips } = user;

  const isClipped = () => {
    return clips.some(clip => clip.url === article.url);
  }

  const toggleClipe = () => {
    if(isClipped()){
      dispatch(deleteClip({clip: article}))
    }else{
      dispatch(addClip({clip: article}))
    }
  }


  return(
    <SafeAreaView style={styles.container}>
      <ClipButton
      onPress={toggleClipe}
      enabled={isClipped()}
      />
      <WebView source={{uri:article.url}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }
});

export default ArticleScreen;
