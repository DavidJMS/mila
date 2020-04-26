from django.db import models

# Create your models here.
class Category(models.Model):
    title       = models.CharField(max_length=100, null=True, verbose_name='Título')

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorías"
        ordering = ["-title"]

    def __str__(self):
        return self.title

class Image(models.Model):
    title       = models.CharField(max_length=100, null=True, verbose_name='Título')
    category    = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Categoría')
    labels      = models.CharField(max_length=300, null=True, verbose_name='Etiquetas')
    description = models.TextField(null=True, verbose_name='Descripción')
    created     = models.DateTimeField(auto_now_add=True, verbose_name='Fecha De Creación De La Imagen')
    updated     = models.DateTimeField(auto_now=True, verbose_name='Fecha De Edición De La Imagen')
    image       = models.ImageField(upload_to='gallery/', null=True, verbose_name='Imagen')

    class Meta:
        verbose_name = "Imagen"
        verbose_name_plural = "Imagenes"
        ordering = ["-created"]

    def __str__(self):
        return self.title
