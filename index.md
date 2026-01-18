---
layout: default
title: "Luis Brena"
---
{% assign p = site.data.profile %}

## Summary {#summary}

{% for line in p.summary %}
{{ line }}

{% endfor %}

<ul class="chips" aria-label="Highlights">
  {% for item in p.highlights %}
    <li><span class="chip">{{ item }}</span></li>
  {% endfor %}
</ul>

<p class="muted">Full details live in my CV. Thank you for visiting!</p>

## Research {#research}

<ul>
  {% for item in site.data.research %}
    <li>
      <strong>{{ item.title }}</strong>
      {% if item.status %}<span class="muted"> — {{ item.status }}</span>{% endif %}
      {% if item.links %}
        {% for link in item.links %}
          {% if link.url contains 'http' %}
            · <a href="{{ link.url }}" target="_blank" rel="noopener">{{ link.label }}</a>
          {% else %}
            · <a href="{{ link.url | relative_url }}">{{ link.label }}</a>
          {% endif %}
        {% endfor %}
      {% endif %}
    </li>
  {% endfor %}
</ul>

## Education {#education}

<ul class="education-list">
  {% for edu in site.data.education %}
    <li><strong>{{ edu.degree }}</strong> — {{ edu.school }} <span class="muted">({{ edu.when }})</span></li>
  {% endfor %}
</ul>

## Projects {#projects}

<div class="projects-grid">
  {% for proj in site.data.projects %}
    {% include project-card.html project=proj %}
  {% endfor %}
</div>
