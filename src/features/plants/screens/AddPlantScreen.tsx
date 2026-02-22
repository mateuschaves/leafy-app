import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const BackButton = styled.TouchableOpacity`
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const BackButtonText = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primary};
`;

const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xl}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const OptionCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 3;
`;

const OptionEmoji = styled.Text`
  font-size: 40px;
  margin-right: ${({ theme }) => theme.spacing.md}px;
`;

const OptionContent = styled.View`
  flex: 1;
`;

const OptionTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 4px;
`;

const OptionDescription = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

const ArrowText = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text.muted};
`;

interface AddPlantScreenProps {}

export const AddPlantScreen: React.FC<AddPlantScreenProps> = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <BackButtonText>←</BackButtonText>
        </BackButton>
        <HeaderTitle>{t('plants.add.title')}</HeaderTitle>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <OptionCard
          onPress={() => navigation.navigate('Catalog')}
          activeOpacity={0.8}
        >
          <OptionEmoji>📚</OptionEmoji>
          <OptionContent>
            <OptionTitle>{t('plants.add.fromCatalog')}</OptionTitle>
            <OptionDescription>{t('plants.add.fromCatalogSubtitle')}</OptionDescription>
          </OptionContent>
          <ArrowText>→</ArrowText>
        </OptionCard>

        <OptionCard
          onPress={() => navigation.navigate('PlantForm')}
          activeOpacity={0.8}
        >
          <OptionEmoji>✏️</OptionEmoji>
          <OptionContent>
            <OptionTitle>{t('plants.add.custom')}</OptionTitle>
            <OptionDescription>{t('plants.add.customDescription')}</OptionDescription>
          </OptionContent>
          <ArrowText>→</ArrowText>
        </OptionCard>
      </Content>
    </Container>
  );
};
