import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function CustomText({
    children,
    size = RFValue(12),
    color= 'white',
    opacity=1,
    fontWeight= 'normal',
    style,
    ...props
}): JSX.Element {
  return (
    <View>
      <Text style={{fontSize: size, color, opacity, fontWeight}} {...props}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})