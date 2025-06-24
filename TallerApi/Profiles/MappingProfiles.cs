using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using AutoMapper;
using Application.DTOs.Auth;
using Application.DTOs.Entities;

namespace TallerApi.Profiles
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {
            CreateMap<Brand, BrandDto>().ReverseMap();
            CreateMap<Client, ClientDto>().ReverseMap();
            CreateMap<FuelType, FuelTypeDto>().ReverseMap();
            CreateMap<Invoice, InvoiceDto>().ReverseMap();
            CreateMap<InvoiceDetail, InvoiceDetaiDto>().ReverseMap();
            CreateMap<OrderDetail, OrderDetailDto>().ReverseMap();
            CreateMap<ServiceOrder, ServiceOrderDto>().ReverseMap();
            CreateMap<ServiceStatus, ServiceStatusDto>().ReverseMap();
            CreateMap<ServiceType, ServiceTypeDto>().ReverseMap();
            CreateMap<Spare, SpareDto>().ReverseMap();
            CreateMap<Specialty, SpecialityDto>().ReverseMap();
            CreateMap<Vehicle, VehicleDto>().ReverseMap();
            CreateMap<VehicleAnormality, VehicleAnormalityDto>().ReverseMap();
            CreateMap<VehicleAnormalityDetail, VehicleAnormalityDetailDto>().ReverseMap();
            CreateMap<VehicleModel, VehicleModelDto>().ReverseMap();
            CreateMap<VehicleType, VehicleTypeDto>().ReverseMap();
            
            
        }
    }
}