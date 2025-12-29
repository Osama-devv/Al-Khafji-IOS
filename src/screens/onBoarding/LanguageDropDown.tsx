import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

interface LanguageDropDownProps {
  onSelect?: (lang: 'EN' | 'AR') => void;
}

const LanguageDropDown: React.FC<LanguageDropDownProps> = ({ onSelect }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<'EN' | 'AR'>('EN');

  const handleSelect = (lang: 'EN' | 'AR') => {
    setSelectedLang(lang);
    setVisible(false);
    onSelect?.(lang);
  };


  return (
    <View>
      <TouchableOpacity
        style={styles.langButton}
        onPress={() => setVisible(true)}>
        <Text style={styles.langText}>{selectedLang} ▾</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => handleSelect('EN')}
              style={styles.option}>
              <Text style={styles.optionText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelect('AR')}
              style={styles.option}>
              <Text style={styles.optionText}>العربية</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  langButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  langText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 70,
    paddingRight: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 5,
    width: 120,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 15,
    color: '#000',
  },
});

export default LanguageDropDown;
