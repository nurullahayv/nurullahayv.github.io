import os
import yaml
from bs4 import BeautifulSoup
from datetime import datetime

# Ayarlar
POSTS_DIR = 'posts'
HTML_FILE = 'index.html'

def load_posts():
    posts = []
    if not os.path.exists(POSTS_DIR):
        return posts
        
    for filename in os.listdir(POSTS_DIR):
        if filename.endswith(".md"):
            filepath = os.path.join(POSTS_DIR, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # YAML Frontmatter (Meta veri) ve İçeriği ayır
            if content.startswith('---'):
                try:
                    parts = content.split('---', 2)
                    meta = yaml.safe_load(parts[1])
                    body = parts[2].strip()
                    
                    # Özet oluştur (ilk 150 karakter)
                    summary = body[:150] + "..." if len(body) > 150 else body
                    
                    post_data = {
                        'title': meta.get('title', 'Başlıksız'),
                        'date': meta.get('date', datetime.now().strftime('%Y-%m-%d')),
                        'category': meta.get('category', 'others'), # dl, rl, others, research, ilim, kisisel
                        'summary': meta.get('description', summary)
                    }
                    posts.append(post_data)
                except Exception as e:
                    print(f"Hata: {filename} okunamadı. {e}")
    
    # Tarihe göre tersten sırala (En yeni en üstte)
    posts.sort(key=lambda x: x['date'], reverse=True)
    return posts

def update_html(posts):
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Kategorilerin HTML'deki ID haritası
    # Study bölümü sütun yapısında (column), diğerleri liste yapısında (article-list)
    mapping = {
        'dl': {'id': 'dl-column', 'type': 'column'},
        'rl': {'id': 'rl-column', 'type': 'column'},
        'others': {'id': 'others-column', 'type': 'column'},
        'research': {'id': 'research-section', 'type': 'section'},
        'ilim': {'id': 'ilim-section', 'type': 'section'},
        'kisisel': {'id': 'kisisel-section', 'type': 'section'}
    }

    # Önce mevcut içerikleri temizleyelim (sadece article class'ı olanları)
    for cat, config in mapping.items():
        container = None
        if config['type'] == 'column':
            container = soup.find(id=config['id'])
        else:
            section = soup.find(id=config['id'])
            if section:
                container = section.find(class_='article-list')
        
        if container:
            # Başlıkları (column-title) koruyup, article'ları silelim
            for div in container.find_all("div", class_="article"):
                div.decompose()

    # Yeni postları ekleyelim
    for post in posts:
        cat = post['category']
        if cat not in mapping:
            continue
            
        config = mapping[cat]
        container = None
        
        if config['type'] == 'column':
            container = soup.find(id=config['id'])
        else:
            section = soup.find(id=config['id'])
            if section:
                container = section.find(class_='article-list')
                
        if container:
            # HTML yapısını oluştur
            # Tarihi formatla (Örn: Jan 29, 2025)
            date_obj = datetime.strptime(str(post['date']), '%Y-%m-%d')
            formatted_date = date_obj.strftime('%b %d, %Y')

            new_article = soup.new_tag("div", **{"class": "article"})
            
            title_div = soup.new_tag("div", **{"class": "article-title"})
            title_div.string = post['title']
            
            date_span = soup.new_tag("span", **{"class": "article-date"})
            date_span.string = formatted_date
            
            title_div.append(date_span)
            
            p_tag = soup.new_tag("p")
            p_tag.string = post['summary']
            
            new_article.append(title_div)
            new_article.append(p_tag)
            
            # Column yapısında başlık (column-title) en üstte kalmalı, altına ekliyoruz
            if config['type'] == 'column':
                container.append(new_article)
            else:
                container.append(new_article)

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    print("Blog güncelleniyor...")
    posts = load_posts()
    update_html(posts)
    print("İşlem tamamlandı.")
