
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

// Property form schema
const formSchema = z.object({
  name: z.string().min(5, {
    message: "Le nom doit contenir au moins 5 caractères.",
  }),
  description: z.string().min(20, {
    message: "La description doit contenir au moins 20 caractères.",
  }),
  type: z.string().min(1, {
    message: "Veuillez sélectionner un type de propriété.",
  }),
  location: z.object({
    address: z.string().min(5, {
      message: "L'adresse est requise.",
    }),
    city: z.string().min(1, {
      message: "La ville est requise.",
    }),
    zipCode: z.string().min(1, {
      message: "Le code postal est requis.",
    }),
    country: z.string().min(1, {
      message: "Le pays est requis.",
    }),
  }),
  details: z.object({
    bedrooms: z.coerce.number().min(1, {
      message: "Au moins 1 chambre est requise.",
    }),
    beds: z.coerce.number().min(1, {
      message: "Au moins 1 lit est requis.",
    }),
    bathrooms: z.coerce.number().min(1, {
      message: "Au moins 1 salle de bain est requise.",
    }),
    maxGuests: z.coerce.number().min(1, {
      message: "Vous devez accueillir au moins 1 personne.",
    }),
  }),
  price: z.coerce.number().min(1, {
    message: "Le prix par nuit est requis.",
  }),
  amenities: z.array(z.string()).optional(),
});

const propertyTypes = [
  { value: "apartment", label: "Appartement" },
  { value: "house", label: "Maison" },
  { value: "villa", label: "Villa" },
  { value: "cabin", label: "Chalet" },
  { value: "loft", label: "Loft" },
  { value: "studio", label: "Studio" },
];

const amenitiesOptions = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "pool", label: "Piscine" },
  { id: "ac", label: "Climatisation" },
  { id: "kitchen", label: "Cuisine équipée" },
  { id: "parking", label: "Parking" },
  { id: "washer", label: "Machine à laver" },
  { id: "tv", label: "Télévision" },
  { id: "terrace", label: "Terrasse" },
  { id: "garden", label: "Jardin" },
  { id: "bbq", label: "Barbecue" },
  { id: "sea_view", label: "Vue sur la mer" },
  { id: "mountain_view", label: "Vue sur la montagne" },
];

export default function PropertyForm() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      location: {
        address: "",
        city: "",
        zipCode: "",
        country: "France",
      },
      details: {
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
      },
      price: 0,
      amenities: [],
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setImages([...images, ...newFiles]);
      
      // Create preview URLs for display
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...newUrls]);
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    const newUrls = [...imageUrls];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newUrls[index]);
    
    newImages.splice(index, 1);
    newUrls.splice(index, 1);
    
    setImages(newImages);
    setImageUrls(newUrls);
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Check if at least one image is uploaded
    if (images.length === 0) {
      toast.error("Veuillez ajouter au moins une image de votre propriété");
      return;
    }
    
    // In a real app, this would send the form data and images to the backend
    console.log("Form values:", values);
    console.log("Images:", images);
    
    // Show success message
    toast.success("Votre propriété a été ajoutée avec succès !");
    
    // Navigate to the properties overview
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ajouter une propriété</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
                <CardDescription>
                  Les informations de base sur votre propriété
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la propriété</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Villa moderne avec vue sur mer" {...field} />
                      </FormControl>
                      <FormDescription>
                        Un titre attrayant qui décrit votre propriété
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre propriété en détail..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Une description détaillée qui met en valeur les caractéristiques et avantages de votre propriété
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de propriété</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Localisation</CardTitle>
                <CardDescription>
                  L'adresse de votre propriété
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="location.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 123 avenue des Oliviers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Nice" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 06000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="location.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Détails de l'hébergement</CardTitle>
                <CardDescription>
                  Les caractéristiques de votre propriété
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="details.bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de chambres</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="details.beds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de lits</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="details.bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de salles de bain</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" step="0.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="details.maxGuests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacité d'accueil (personnes)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Équipements</CardTitle>
                <CardDescription>
                  Les équipements disponibles dans votre propriété
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {amenitiesOptions.map((amenity) => (
                          <FormField
                            key={amenity.id}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => (
                              <FormItem
                                key={amenity.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(amenity.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value || [], amenity.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== amenity.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {amenity.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>
                  Ajoutez des photos attrayantes de votre propriété
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="images" className="text-sm font-medium">
                    Télécharger des images
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => document.getElementById("images")?.click()}
                    >
                      Parcourir
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Formats acceptés: JPG, PNG, WEBP. Taille maximum: 5MB par image
                  </p>
                </div>
                
                {imageUrls.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Images téléchargées</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative aspect-square">
                          <img
                            src={url}
                            alt={`Property image ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tarification</CardTitle>
                <CardDescription>
                  Définissez le prix de votre propriété
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix par nuit (en €)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Le prix que les voyageurs paieront par nuit pour séjourner dans votre propriété
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <div className="flex flex-col gap-4 md:flex-row md:gap-8 md:justify-end">
              <Button 
                type="button" 
                variant="outline"
                className="md:order-1"
                onClick={() => navigate("/dashboard")}
              >
                Annuler
              </Button>
              <Button type="submit" className="md:order-2">
                Publier l'annonce
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
      <Footer />
    </div>
  );
}
