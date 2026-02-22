import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { catalogPlants } from '../data/catalogPlants';
import { CatalogPlant, PlantCategory } from '../types';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.md}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xxl}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const HeaderSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: 4px;
`;

const SearchInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
`;

const CategoryScroll = styled.ScrollView`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const CategoryChip = styled.TouchableOpacity<{ selected: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  margin-left: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.card};
  border-width: 1px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.border};
`;

const CategoryChipText = styled.Text<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.text.inverse : theme.colors.text.primary};
`;

const PlantItemCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.lg}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  margin: 0 ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.06;
  shadow-radius: 6px;
  elevation: 2;
`;

const PlantEmoji = styled.Text`
  font-size: 40px;
  width: 56px;
  text-align: center;
`;

const PlantInfo = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const PlantName = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const PlantDescription = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.sm}px;
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: 2px;
  line-height: 18px;
`;

const WateringBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  padding: 4px 8px;
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  align-self: flex-start;
`;

const WateringBadgeText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const AddButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.sm}px;
  padding: ${({ theme }) => theme.spacing.sm}px ${({ theme }) => theme.spacing.md}px;
  align-self: flex-start;
`;

const AddButtonText = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xs}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.primary};
`;

const CATEGORIES: PlantCategory[] = ['all', 'succulents', 'tropical', 'herbs', 'flowering'];

interface CatalogScreenProps {}

export const CatalogScreen: React.FC<CatalogScreenProps> = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PlantCategory>('all');

  const filtered = catalogPlants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(search.toLowerCase()) ||
      plant.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectPlant = (plant: CatalogPlant) => {
    navigation.navigate('PlantForm', { catalogPlant: plant });
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>📚 {t('catalog.title')}</HeaderTitle>
        <HeaderSubtitle>{t('catalog.subtitle')}</HeaderSubtitle>
      </Header>

      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder={t('catalog.search')}
        placeholderTextColor={theme.colors.text.muted}
        clearButtonMode="while-editing"
      />

      <CategoryScroll
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            selected={selectedCategory === cat}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.8}
          >
            <CategoryChipText selected={selectedCategory === cat}>
              {t(`catalog.categories.${cat}`)}
            </CategoryChipText>
          </CategoryChip>
        ))}
      </CategoryScroll>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlantItemCard onPress={() => handleSelectPlant(item)} activeOpacity={0.8}>
            <PlantEmoji>{item.emoji}</PlantEmoji>
            <PlantInfo>
              <PlantName>{item.name}</PlantName>
              <PlantDescription numberOfLines={2}>{item.description}</PlantDescription>
              <WateringBadge>
                <WateringBadgeText>
                  {t('catalog.wateringEvery', { count: item.wateringIntervalDays })}
                </WateringBadgeText>
              </WateringBadge>
            </PlantInfo>
            <AddButton onPress={() => handleSelectPlant(item)} activeOpacity={0.8}>
              <AddButtonText>{t('catalog.addToCollection')}</AddButtonText>
            </AddButton>
          </PlantItemCard>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </Container>
  );
};
