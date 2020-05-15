import React from 'react';
import { Button } from 'react-native';

export default ({ navigation }) => (
  <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
);