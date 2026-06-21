import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { CHAT_RESPONSES, DEFAULT_RESPONSE } from '../data/chatResponses';
import { ChatMessage } from '../types';
import ChatBubble from '../components/ChatBubble';

const BOT_GREETING: ChatMessage = {
  id: 'greeting',
  text: "Hello! 👋 I'm the UNIZIK Assistant. How can I help you today?",
  sender: 'bot',
  timestamp: new Date(),
};

const SUGGESTED_PROMPTS = [
  'Where is the Registry?',
  'How do I process clearance?',
  'Library hours',
  'Book an appointment',
];

let messageCounter = 1;
const nextMessageId = () => `msg-${messageCounter++}`;

function getBotResponse(userText: string): string {
  const normalized = userText.toLowerCase();
  for (const entry of CHAT_RESPONSES) {
    if (entry.keywords.some((kw) => normalized.includes(kw.toLowerCase()))) {
      return entry.response;
    }
  }
  return DEFAULT_RESPONSE;
}

export default function AssistantScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([BOT_GREETING]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: nextMessageId(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: nextMessageId(),
        text: getBotResponse(trimmed),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>🤖</Text>
        </View>
        <View>
          <Text style={styles.headerTitle}>UNIZIK Assistant 🤖</Text>
          <Text style={styles.headerSubtitle}>Online • Typically replies instantly</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {messages.length <= 1 && (
          <View style={styles.suggestedWrap}>
            <Text style={styles.suggestedTitle}>Quick questions</Text>
            <View style={styles.suggestedRow}>
              {SUGGESTED_PROMPTS.map((prompt) => (
                <TouchableOpacity
                  key={prompt}
                  style={styles.suggestedChip}
                  onPress={() => sendMessage(prompt)}
                >
                  <Text style={styles.suggestedChipText}>{prompt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        <View style={{ height: 12 }} />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inputWrap}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything about UNIZIK..."
            placeholderTextColor={COLORS.textLight}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim()}
            activeOpacity={0.85}
          >
            <Ionicons name="send" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  header: {
    backgroundColor: COLORS.primaryBlue,
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${COLORS.accentGold}33`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  headerAvatarText: {
    fontSize: 22,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.85,
    marginTop: 2,
  },
  chatArea: {
    flex: 1,
    paddingTop: 18,
  },
  chatContent: {
    paddingBottom: 12,
  },
  suggestedWrap: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  suggestedTitle: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  suggestedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  suggestedChip: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  suggestedChipText: {
    fontSize: 13,
    color: COLORS.primaryBlue,
    fontWeight: '600',
  },
  inputWrap: {
    backgroundColor: COLORS.white,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    maxHeight: 100,
    marginRight: 10,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.border,
  },
});
