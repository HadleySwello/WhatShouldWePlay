import { Modal, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import AppButton from './AppButton';
import { useAppTheme } from '../theme';
import copy from '../constants/copy';

export default function AppFAQModal({ visible, onClose, onSelectDemo }) {
  const { styles, tokens } = useAppTheme();
  const t = copy.faq;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.helpModal.overlay}>
        <View style={styles.helpModal.content}>
          <TouchableOpacity
            style={styles.helpModal.closeIcon}
            onPress={onClose}
          >
            <Feather name="x" size={24} color={tokens.colors.textSecondary} />
          </TouchableOpacity>
          <AppText variant="header" style={styles.helpModal.title}>
            {t.title}
          </AppText>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FAQItem question={t.q1} answer={t.a1} />
            <FAQItem question={t.q2} answer={t.a2} />
            <FAQItem question={t.q3} answer={t.a3} />
            <FAQItem question={t.q4} answer={t.a4} />
            <FAQItem question={t.q5}>
              <AppText style={styles.helpModal.answer}>
                {t.a5.split('{{demoUsername}}')[0]}
                <AppText
                  style={styles.helpModal.demoLink}
                  onPress={() => onSelectDemo?.('aldie')}
                >
                  aldie
                </AppText>
                {t.a5.split('{{demoUsername}}')[1]}
              </AppText>
            </FAQItem>
          </ScrollView>
          <View style={styles.helpModal.closeButton}>
            <AppButton variant="secondary" onPress={onClose}>
              {t.close}
            </AppButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function FAQItem({ question, answer, children }) {
  const { styles } = useAppTheme();
  return (
    <View style={styles.helpModal.faqItem}>
      <AppText style={styles.helpModal.question}>{question}</AppText>
      {children || <AppText style={styles.helpModal.answer}>{answer}</AppText>}
    </View>
  );
}
